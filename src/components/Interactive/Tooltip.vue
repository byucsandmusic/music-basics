<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BoundingRect } from '../../models/types'
import CloseIcon from '../CloseIcon.vue'
import { InteractiveItem } from '../../models/interactiveItem'

export default defineComponent({
    name: 'Tooltip',
    components: { CloseIcon },
    emits: ['toggle'],
    props: {
        clickableRect: {
            type: Object as PropType<BoundingRect>,
            required: true,
        },
        item: {
            type: Object as PropType<InteractiveItem>,
            required: true,
        },
    },
    data() {
        return {
            tooltipRect: {} as BoundingRect,
        }
    },
    computed: {
        tooltipLeft() {
            return `calc(${this.clickableRect.left}% + ${this.clickableRect.width / 2}% - ${this.tooltipRect.width / 2}px)`
        },
        tooltipTop() {
            return `calc(${this.clickableRect.top}% - ${this.tooltipRect.height}px - 6px)`
        },
        triangleLeft() {
            return `calc(${this.tooltipRect.width / 2}px - 3px)`
        },
        triangleTop() {
            return `calc(${this.tooltipTop}px + ${this.tooltipRect.height}px)`
        },
    },
    methods: {
        calcTooltipPlacement() {
            this.tooltipRect = (({ top, left, width, height }) => ({
                top,
                left,
                width,
                height,
            }))(this.$refs.tooltip.getBoundingClientRect())
        },
        handleClick() {
            this.$emit('toggle')
        },
    },
    mounted() {
        this.calcTooltipPlacement()
    },
})
</script>

<template>
    <div
        ref="tooltip"
        class="tooltip"
    >
        <div
            ref="tooltip"
            class="tooltip-body"
        >
            <CloseIcon @close="handleClick" />
            <div
                class="tooltip-text"
                v-html="item.title"
            ></div>
        </div>

        <div class="triangle-bottom"></div>
    </div>
</template>

<style scoped lang="sass">
.tooltip
    display: flex
    top: v-bind(tooltipTop)
    left: v-bind(tooltipLeft)
    flex-direction: column
    margin: 0
    position: absolute

.tooltip-body
    background: $accent-color
    padding: min(0.5rem, 5%)
    color: $secondary-text
    cursor: default
    border-radius: 30px
    flex-direction: row
    display: flex
    z-index: 10
    margin-bottom: 0
    min-width: fit-content
    filter: drop-shadow(1px 2px 6px #a9a9a9)

.tooltip-text
    flex-direction: row
    margin: 0.3rem

.triangle-bottom
    width: 0
    height: 0
    border-left: 6px solid transparent
    border-right: 6px solid transparent
    border-top: 6px solid $accent-color
    margin-top: 0
    position: relative
    top: v-bind(triangleTop)
    left: v-bind(triangleLeft)
    z-index: 10
    filter: drop-shadow(1px 2px 6px #a9a9a9)

@media (prefers-color-scheme: dark)
    .tooltip-body
        background: $accent-color-dark
        color: $primary-text

    .triangle-bottom
        border-top: 6px solid $accent-color-dark

@media (max-width: 425px)
    .tooltip-text
        font-size: small
</style>
