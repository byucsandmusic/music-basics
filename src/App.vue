<script>
import { RouterView } from 'vue-router'
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
  <nav>
    <RouterLink to="/">{{ translator.get('general', 'home') }}</RouterLink>
    <RouterLink>{{ translator.get('module1', 'title') }}</RouterLink>
    <RouterLink>{{ translator.get('module2', 'title') }}</RouterLink>
    <RouterLink>{{ translator.get('module3', 'title') }}</RouterLink>
    <RouterLink to="/dummy">{{ translator.get('dummy', 'title') }}</RouterLink>
  </nav>
  <RouterView v-slot="{ Component }">
    <component
      :is="Component"
      :translator="translator"
    />
  </RouterView>
</template>

<style scoped>

</style>
