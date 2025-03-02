<script lang="ts">
import { defineComponent, PropType } from 'vue'
import confetti from 'canvas-confetti'
import { ConfettiOptions } from '../models/types'

/**
 * Docs on this can be found here:
 * https://www.npmjs.com/package/canvas-confetti
 *
 * @prop options - all properties of this object are optional, the canvas-confetti
 *                 docs will tell you all that you need to know
 * @prop duration - the amount of time (ms) that the confetti animation will play
 */
export default defineComponent({
    name: 'Confetti',
    props: {
        options: {
            type: Object as PropType<ConfettiOptions>,
            default: {} as ConfettiOptions,
        },
        duration: {
            type: Number,
            default: 1,
        },
    },
    computed: {
        end() {
            return Date.now() + this.duration
        },
    },
    methods: {
        spray() {
            if (Date.now() < this.end) {
                window.requestAnimationFrame(() => confetti(this.options))
            }
        },
    },
    mounted() {
        this.spray()
    },
})
</script>

<template></template>

<style scoped lang="sass"></style>
