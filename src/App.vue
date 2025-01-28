<script>
import HomePage from './components/HomePage.vue'
import Translator from './models/translator'

export default {
  components: {
    HomePage
  },
  data() {
    return {
      translator: new Translator('EN')
    }
  }
}
</script>

<template>
  <meta>
    <title>{{ translator.get('home', 'title') }}</title>
  </meta>
  <HomePage :translator="translator"></HomePage>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
