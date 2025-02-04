<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../models/translator'

export default defineComponent({
    name: 'NotFound',
    props: {
        translator: Translator,
    },
    mounted() {
        setTimeout(() => this.$router.push('/home'), 1000)
    },
})
</script>

<template>
    <h1>{{ translator.get('general', 'notFound', 'header') }}</h1>
    <p>{{ translator.get('general', 'notFound', 'body') }}</p>
</template>

<style scoped></style>
