<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { type BoundingRect } from '../../models/types'

export default defineComponent({
    name: 'Tooltip',
    emits: ['close-others'],
    props: {
        body: {
            type: String,
            default: '',
        },
        clickableRect: {
            type: Object as PropType<BoundingRect>,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            toggled: false,
            tooltipRect: {} as BoundingRect,
        }
    },
    computed: {
        tooltipTop() {
            return `calc(${this.clickableRect.top}% - ${this.tooltipRect.height}px - 6px)`
        },
        tooltipLeft() {
            return `calc(${this.clickableRect.left}% + ${this.clickableRect.width / 2}% - ${this.tooltipRect.width / 2}px)`
        },
    },
    methods: {
        handleClick() {
            if (this.link?.length) {
                window.location.href = this.link
            } else {
                if (!this.toggled) {
                    this.$emit('close-others', this.id)
                }

                this.toggled = !this.toggled

                if (this.toggled) {
                    this.$nextTick(() => this.calcTooltipPlacement())
                }
            }
        },
        calcTooltipPlacement() {
            this.tooltipRect = (({ top, left, width, height }) => ({
                top,
                left,
                width,
                height,
            }))(this.$refs.tooltip.getBoundingClientRect())
        },
        getBoundingClientRect() {
            return
        },
        close() {
            this.toggled = false
        },
    },
})
</script>

<template>
    <div>
        <div
            :style="`
            top: ${clickableRect.top}%;
            left: ${clickableRect.left}%;
            width: ${clickableRect.width}%;
            height: ${clickableRect.height}%;
            `"
            class="clicky"
            @click="handleClick"
        ></div>
        <Transition>
            <div
                v-if="toggled"
                class="tooltip"
            >
                <div
                    class="tooltip-body"
                    ref="tooltip"
                >
                    <div
                        @click="handleClick"
                        class="x"
                    >
                        x
                    </div>
                    <div class="tooltip-text">
                        <div :class="{ title: !!body.length }">{{ title }}</div>
                        <div v-if="body.length">{{ body }}</div>
                    </div>
                </div>

                <div class="triangle-bottom"></div>
            </div>
        </Transition>
        <div
            v-if="toggled"
            @click="close"
            class="click-away"
        />
    </div>
</template>

<style scoped lang="sass">
.clicky
    background: rgba(170, 241, 255, 0.32)
    border: 1px dashed rgba(147, 208, 255, 0.9)
    position: absolute
    cursor: pointer

.clicky:hover
    background: rgba(170, 241, 255, 0.55)
    border: 1px solid rgba(147, 208, 255, 0.99)

.tooltip-body
    background: #92c5dc
    padding: min(0.5rem, 5%)
    color: black
    cursor: default
    border-radius: 30px
    flex-direction: row
    display: flex
    z-index: 10
    margin-bottom: 0
    min-width: 4rem
    filter: drop-shadow(1px 2px 6px #a9a9a9)

.title
    font-weight: bold

.tooltip
    display: flex
    top: v-bind(tooltipTop)
    left: v-bind(tooltipLeft)
    flex-direction: column
    margin: 0
    position: absolute

.tooltip-text
    flex-direction: row

.x
    cursor: pointer
    margin-left: 10px
    margin-right: 0.2rem
    font-size: small
    align-self: start

.triangle-top,
.triangle-bottom
    width: 0
    height: 0
    border-left: 6px solid transparent
    border-right: 6px solid transparent
    border-top: 6px solid #92c5dc
    margin-top: 0
    place-self: center
    z-index: 10
    filter: drop-shadow(1px 2px 6px #a9a9a9)

.triangle-top
    transform: rotate(180deg)

.click-away
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 0

.v-enter-active
    transition: all 0.3s ease-out
.v-leave-active
    transition: all 0.4s ease-out

.v-enter-from
    transform: translateY(10%)
.v-leave-to
    transform: translateY(5%)
</style>
