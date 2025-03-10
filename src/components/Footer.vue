<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../models/translator'
import ButtonBar from './ButtonBar.vue'
import { useCurrentPage } from '../utils/currentPage'

export default defineComponent({
    name: 'Footer',
    components: { ButtonBar },
    props: {
        translator: {
            type: Translator,
            required: true,
        },
    },
    setup({ translator }) {
        return useCurrentPage(translator)
    },
    data() {
        return {
            oldPercent: '',
            progressing: false,
        }
    },
    computed: {
        progressBarWidth() {
            return `calc(${this.percentCompleted} * 100vw)`
        },
        percentCompleted() {
            return this.pageIndex / (this.menuItems[this.module].length - 1)
        },
    },
    watch: {
        percentCompleted(val, oldVal) {
            if ((val !== 0 || oldVal !== 1) && (val !== 1 || oldVal !== 0)) {
                this.progressing = true
                setTimeout(() => (this.progressing = false), 500)
            }
            this.oldPercent = `calc(${oldVal} * 100vw)`
        },
    },
})
</script>

<template>
    <div class="footer">
        <div class="progress-container">
            <div :class="['progress-bar', { progression: progressing }]" />
        </div>
        <ButtonBar :translator="translator" />
    </div>
</template>

<style scoped lang="sass">
.footer
    position: fixed
    bottom: 0
    left: 0
    right: 0
    height: $footer-height
    background: $secondary-background

.progress-container,
.progress-bar
    height: 0.2rem

.progress-bar
    background: $accent-color

.progress-container
    width: v-bind(progressBarWidth)


.progression
    animation: progress 0.5s ease-in-out
    animation-fill-mode: both

@media (prefers-color-scheme: dark)
    .footer
        background: $secondary-background-dark
    .progress-bar
        background: $accent-color-dark

@keyframes progress
    0%
        width: v-bind(oldPercent)
    100%
        width: 100%
</style>
