<script lang="ts">
import { defineComponent } from 'vue'
import usePages from '../utils/pages'
import { useRoute } from 'vue-router'
import Translator from '../models/translator'
import ButtonBar from './ButtonBar.vue'
import { useCurrentPage } from '../utils/currentPage'

export default defineComponent({
    name: 'Footer',
    components: { ButtonBar },
    setup({ translator }) {
        return useCurrentPage(translator)
    },
    props: {
        translator: {
            type: Translator,
            required: true,
        },
        footerHeight: {
            type: String,
            required: true,
        },
    },
    computed: {
        progressBarWidth() {
            return `calc(${this.percentCompleted} * 100vw)`
        },
        percentCompleted() {
            return this.pageIndex / (this.menuItems[this.module].length - 1)
        },
    },
})
</script>

<template>
    <div class="footer">
        <div class="progress-bar" />
        <ButtonBar :translator="translator" />
    </div>
</template>

<style scoped lang="sass">
.footer
    position: fixed
    bottom: 0
    left: 0
    right: 0
    height: v-bind(footerHeight)
    background: $secondary-background

.progress-bar
    height: 0.2rem
    background: $accent-color
    width: v-bind(progressBarWidth)

@media (prefers-color-scheme: dark)
    .footer
        background: $secondary-background-dark
    .progress-bar
        background: $accent-color-dark
</style>
