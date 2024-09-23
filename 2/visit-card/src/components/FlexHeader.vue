<template>
    <component :is="headerTag">
        <slot></slot>
    </component>
</template>
<script>

export default {
  name: 'FlexHeader',
  props: {
    size: {
      type: Number,
      default: 1,
      validator (value) {
        return value >= 1 && value <= 6
      }
    }
  },
  computed: {
    headerTag () {
      return `h${this.size}`
    }
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Arial';
  text-align: center;
  justify-content: center;
}
h2 {
  font-family: 'Tahoma';
  text-align: center;
  justify-content: center;
}
h3 {
  font-family: 'Comic Sans MS';
  text-align: center;
  justify-content: center;
}
h4 {
  font-family: 'Book Antiqua';
  text-align: center;
  justify-content: center;
}
h5 {
  font-family: 'Courier New';
  text-align: center;
  justify-content: center;
}
h6 {
  font-family: 'Times New Roman';
  text-align: center;
  justify-content: center;
}
</style>
