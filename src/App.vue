<script>
import { RouterView } from 'vue-router'
import HomePage from './components/HomePage.vue'
import Translator from './models/translator'

export default {
  components: {
    HomePage,
  },
  data() {
    return {
      translator: new Translator('EN'),
    }
  },
}
</script>

<template>
  <title>{{ translator.get('home', 'title') }}</title>
  <main class="container">
    <nav class="grid">
      <ul>
        <li><RouterLink to="/">{{ translator.get('general', 'home') }}</RouterLink></li>
        <li><RouterLink to="/">{{ translator.get('module1', 'title') }}</RouterLink></li>
        <li><RouterLink to="/">{{ translator.get('module2', 'title') }}</RouterLink></li>
        <li><RouterLink to="/">{{ translator.get('module3', 'title') }}</RouterLink></li>
        <li><RouterLink to="/dummy">{{ translator.get('dummy', 'title') }}</RouterLink></li>
      </ul>
    </nav>
    <RouterView v-slot="{ Component }">
        <component
            :is="Component"
            :translator="translator"
        />
    </RouterView>
  </main>
</template>

<style scoped>

</style>
