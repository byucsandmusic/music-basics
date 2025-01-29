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

</style>
