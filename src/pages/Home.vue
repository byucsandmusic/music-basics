<script lang="ts">
import Translator from '../models/translator'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    props: {
        translator: {
            type: Translator,
            required: true,
        },
    },
})
</script>

<template>
    <h1>{{ translator.get('home', 'title') }}</h1>
    <div class="grid">
        <button>{{ translator.get('module1', 'title') }}</button>
        <button>{{ translator.get('module2', 'title') }}</button>
        <button>{{ translator.get('module3', 'title') }}</button>
    </div>
</template>

<style scoped></style>
