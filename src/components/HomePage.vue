<script>
import Translator from '../models/translator'

export default {
  props: {
    translator: Translator
  },
}
</script>

<template>
  <h1>{{ translator.get('home', 'title') }}</h1>
  <button>{{ translator.get('module1', 'title') }}</button>
  <button>{{ translator.get('module2', 'title') }}</button>
  <button>{{ translator.get('module3', 'title') }}</button>
  <button>{{ translator.get('dummy', 'title') }}</button>
</template>