<template>
  <FlexHeader :size=6>Заголовок 6</FlexHeader>
  <img :src="image"/>
</template>

<script>
import FlexHeader from './FlexHeader.vue'

export default {
  name: 'PersonImage',
  components: {
    FlexHeader
  },
  props: {
    image: String
  }
}
</script>

<style scoped>
img {
  height: auto;
  width: 100%;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  background-color: #fff;
  padding: 5%;
  box-sizing: border-box;
}
</style>
