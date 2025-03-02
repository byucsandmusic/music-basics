<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../models/translator'

export default defineComponent({
    name: 'ModuleEnd',
    props: {
        translator: {
            type: Translator,
            required: true,
        },
        module: {
            type: String,
            required: true,
        },
    },
    computed: {
        titleSplit() {
            return this.translator.get('general', 'ending').split('/')
        },
        headerStart() {
            return this.titleSplit[0]
        },
        headerEnd() {
            return this.titleSplit[1]
        },
    },
})
</script>

<template>
    <div>
        <h3>{{ headerStart + translator.get(module, 'title') + headerEnd }}</h3>
        <p>{{ translator.get(module, 'ending') }}</p>
    </div>
</template>

<style scoped lang="sass"></style>
