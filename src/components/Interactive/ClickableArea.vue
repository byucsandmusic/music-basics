<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { type BoundingRect } from '../../models/types'
import { InteractiveItem } from '../../models/interactiveItem'
import Sidebar from './Sidebar.vue'
import Tooltip from './Tooltip.vue'

export default defineComponent({
    name: 'ClickableArea',
    components: { Tooltip, Sidebar },
    emits: ['close-others'],
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
            toggled: false,
            tooltipRect: {} as BoundingRect,
        }
    },
    computed: {
        hasBody() {
            return this.item.body?.length
        },
        componentType() {
            return this.hasBody ? 'Sidebar' : 'Tooltip'
        },
    },
    methods: {
        close() {
            this.toggled = false
        },
        handleToggle() {
            if (!this.toggled) {
                this.$emit('close-others', this.item.id)
            }

            this.toggled = !this.toggled
        },
    },
})
</script>

<template>
    <div>
        <div
            class="clicky"
            :style="`
            height: ${clickableRect.height}%;
            width: ${clickableRect.width}%;
            left: ${clickableRect.left}%;
            top: ${clickableRect.top}%;
            `"
            @click="handleToggle"
        ></div>
        <Transition :name="componentType.toLocaleLowerCase()">
            <component
                v-if="toggled"
                :is="componentType"
                :item="item"
                :clickableRect="clickableRect"
                @toggle="handleToggle"
            />
        </Transition>
        <div
            v-if="toggled"
            :class="hasBody ? 'overlay' : 'click-away'"
            @click="close"
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

.click-away
    z-index: 0

.click-away,
.overlay
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0

.overlay
    background-color: black
    opacity: 0.2
    z-index: 10

//Animations
.sidebar-enter-active
    transition: all 0.3s ease-out
.sidebar-leave-active
    transition: all 0.8s ease-out

.sidebar-enter-from,
.sidebar-leave-to
    transform: translateX(min(20rem,100%))

.tooltip-enter-active,
.tooltip-enter-from,
.tooltip-leave-to,
.tooltip-leave-active
    z-index: 10

.tooltip-enter-active
    transition: all 0.3s ease-out
.tooltip-leave-active
    transition: all 0.4s ease-out

.tooltip-enter-from
    transform: translateY(10%)
.tooltip-leave-to
    transform: translateY(5%)
</style>
