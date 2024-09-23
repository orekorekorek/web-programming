<template>
  <FlexHeader :size=4>Заголовок 4</FlexHeader>
  <ol>
    <li>Имя: Иван</li>
    <li>Фамилия: Иванов</li>
    <li>Отчество: Иванович</li>
    <li>Дата рождения: 01.01.2001</li>
    <li>Место рождения: г. Москва</li>
    <li>Пол: мужской</li>
  </ol>
</template>

<script>
import FlexHeader from './FlexHeader.vue'

export default {
  name: 'PersonalData',
  components: {
    FlexHeader
  }
}
</script>
