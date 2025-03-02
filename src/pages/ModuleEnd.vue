<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../models/translator'
import Confetti from '../components/Confetti.vue'

export default defineComponent({
    name: 'ModuleEnd',
    components: { Confetti },
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
        <<<<<<< HEAD
        <Confetti
            :options="{
                startVelocity: 60,
                particleCount: 150,
                gravity: 0.8,
                origin: { y: -0.3 },
                spread: 180,
                angle: -90,
            }"
        />
        ======= >>>>>>> 762e92d (feat: add module ending page)
    </div>
</template>

<style scoped lang="sass"></style>
