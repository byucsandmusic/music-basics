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
    methods: {
        reroute(url: string) {
            this.$router.replace(url)
        },
    },
})
</script>

<template>
    <h1>{{ translator.get('home', 'title') }}</h1>
    <div class="buttons flex-col">
        <button @click="reroute('/module0/intro')">
            {{ translator.get('module0', 'title') }}
        </button>
        <button @click="reroute('/module1/home')">
            {{ translator.get('module1', 'title') }}
        </button>
        <button>{{ translator.get('module2', 'title') }}</button>
        <button>{{ translator.get('module3', 'title') }}</button>
    </div>
</template>

<style scoped lang="sass">
.buttons
    width: 100%

button
    margin: 10px
</style>
