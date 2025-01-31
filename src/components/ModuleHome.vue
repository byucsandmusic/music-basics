<script lang="ts">
import {defineComponent} from 'vue'
import Translator from "../models/translator";

export default defineComponent({
  name: "ModuleHome",
  props: {
    translator: Translator
  },
})
</script>

<template>
<div>{{ translator.get('general', 'loremIpsum') }}</div>
</template>

<style scoped>

</style>