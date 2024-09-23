<template>
  <FlexHeader :size="headerSize" id="manual_changed">Заголовок</FlexHeader>
  <div class="outer">
    <div class="middle">
      <div class="inner">
        <div class="third-width">
          <PesonImage image="https://www.w3schools.com/w3images/avatar2.png"/>
        </div>
        <div class="third-width">
          <ContactInfo/>
        </div>
        <div class="third-width">
          <PersonalData/>
        </div>
        <div class="description">
          Область предоставления дополнительной информации
        </div>
        <div class="copyrights">
          Область информации о правах на копирование
        </div>
      </div>
    </div>
  </div>
  <div class="buttons">
    <button v-if="buttonsVisible[0]" @click="changeHeaderSize(1, 0)">Size 1</button>
    <button v-if="buttonsVisible[1]" @click="changeHeaderSize(2, 1)">Size 2</button>
    <button v-if="buttonsVisible[2]" @click="changeHeaderSize(3, 2)">Size 3</button>
    <button v-if="buttonsVisible[3]" @click="changeHeaderSize(4, 3)">Size 4</button>
    <button v-if="buttonsVisible[4]" @click="changeHeaderSize(5, 4)">Size 5</button>
    <button @click="resetButtons">Reset</button>
  </div>
</template>

<script>
import PesonImage from './PesonImage.vue'
import FlexHeader from './FlexHeader.vue'
import ContactInfo from './ContactInfo.vue'
import PersonalData from './PersonalData.vue'

export default {
  name: 'VisitCard',
  components: {
    PesonImage,
    FlexHeader,
    ContactInfo,
    PersonalData
  },
  data () {
    return {
      headerSize: 1,
      buttonsVisible: [true, true, true, true, true]
    }
  },
  methods: {
    changeHeaderSize (size, index) {
      this.headerSize = size
      for (let i = 0; i < this.buttonsVisible.length; i++) {
        this.buttonsVisible[i] = i !== index
      }
    },
    resetButtons () {
      this.headerSize = 1
      this.buttonsVisible = [true, true, true, true, true]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  padding: 3%;
  width: 100%;
  box-sizing: border-box;
}

.middle {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d0d0d0;
  padding: 3%;
  width: 100%;
  box-sizing: border-box;
}

.inner {
  display: grid;
  padding-top: 8%;
  justify-content: space-between;
  background-color: #b0b0b0;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 3fr 2fr;
  width: 100%;
  box-sizing: border-box;
}

.third-width {
  grid-column: span 1;
  padding: 10px;
  box-sizing: border-box;
}

.description {
  grid-column: span 3; /* Make the description span all 3 columns */
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
}

.copyrights {
  grid-column: span 3; /* Make the description span all 3 columns */
  grid-row: span 1;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
