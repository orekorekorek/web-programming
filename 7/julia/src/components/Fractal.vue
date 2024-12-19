<template>
  <div>
      <h1>Фрактал Жюлиа ({{ wdt }} x {{ hgt }})</h1>
      <svg :width="wdt" :height="hgt">
          <rect v-for="p in pixels" 
                :key="p.x + '-' + p.y"
                :fill="p.color"
                :fill-opacity="p.alpha"
                :x="p.x"
                :y="p.y"
                width="1" 
                height="1"/>
      </svg>

      <div>
          <label for="maxIter">Max Iterations:</label>
          <input type="number" id="maxIter" v-model="maxIter">
          <label for="zoom">Zoom:</label>
          <input type="number" id="zoom" v-model="zoom">
          <label for="moveX">Move X:</label>
          <input type="number" id="moveX" v-model="moveX">
          <label for="moveY">Move Y:</label>
          <input type="number" id="moveY" v-model="moveY">
          <button @click="drawJulia">Update Fractal</button>
      </div>
  </div>

  <div>
      <h2>Calculation Time</h2>
      <ApexChart type="bar" :options="chartOptions" :series="chartOptions.series" />
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    ApexChart: VueApexCharts,
  },
  name: 'Fractal',
  props: {
      wdt: { type: Number, required: true },
      hgt: { type: Number, required: true },
  },
  data() {
      return {
          pixels: [],
          calculationTimes: [],
          labels: [],
          maxIter: 300,
          zoom: 1,
          moveX: 0,
          moveY: 0,
          chartOptions: {
              chart: {
                  type: 'bar',
                  height: 350,
              },
              series: [{
                  name: 'Calculation Time (ms)',
                  data: [],
              }],
              xaxis: {
                  categories: [],
              },
          },
      };
  },
  methods: {
      drawJulia() {
          const pixels = [];
          const cIm = 0.62662;
          const cRe = -0.38135;
          let newRe, newIm, oldRe, oldIm;
          const zoom = this.zoom;
          const moveX = this.moveX;
          const moveY = this.moveY;
          const maxIter = this.maxIter;
          const startTime = performance.now();
          for (let x = 0; x < this.wdt; x++) {
              for (let y = 0; y < this.hgt; y++) {
                  newRe = 1.5 * (x - this.wdt / 2) / (0.5 * zoom * this.wdt) + moveX;
                  newIm = (y - this.hgt / 2) / (0.5 * zoom * this.hgt) + moveY;
                  let i;
                  for (i = 0; i < maxIter; i++) {
                      oldRe = newRe;
                      oldIm = newIm;
                      newRe = (oldRe * oldRe) - (oldIm * oldIm) + cRe;
                      newIm = 2 * oldRe * oldIm + cIm;
                      if ((newRe * newRe + newIm * newIm) > 4) {
                          break;
                      }
                  }
                  const pix = {};
                  pix.x = x;
                  pix.y = y;
                  const R = (i * 9) % 255;
                  const G = 0;
                  const B = (i * 9) % 255;
                  pix.color = "#" + (R.toString(16).length < 2 ? "0" + R.toString(16) : R.toString(16)) 
                              + (G.toString(16).length < 2 ? "0" + G.toString(16) : G.toString(16)) 
                              + (B.toString(16).length < 2 ? "0" + B.toString(16) : B.toString(16));			
                  pix.alpha = 1;
                  pixels.push(pix);
              }
          }
          const endTime = performance.now();
          this.calculationTimes.push(endTime - startTime);
          this.pixels = pixels;
          this.labels.push(`Run ${this.calculationTimes.length}`);
          this.updateChart();
      },
      updateChart() {
        this.chartOptions.series[0].data = this.calculationTimes.map(time => time.toFixed(3));
        this.chartOptions.xaxis.categories = this.labels;
      }
  },
  created() {
    this.drawJulia();
  },
  watch: {
    '$route'() {
        this.drawJulia();
    }
  }
};
</script>

<style scoped>
.chart-container {
  margin-top: 20px;
}
</style>
