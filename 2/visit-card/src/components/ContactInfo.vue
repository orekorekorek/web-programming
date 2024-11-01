<template>
  <FlexHeader :size=5>Заголовок 5</FlexHeader>
  <ul>
    <li>Телефон: +7 999 999 99 99</li>
    <li>Адрес: г. Москва, ул. Пушкина, д. Колотушкина</li>
    <li>Электронная почта:</li>
  </ul>
</template>

<script>
import FlexHeader from './FlexHeader.vue'

export default {
  name: 'ContactInfo',
  components: {
    FlexHeader
  }
}
</script>
