<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { type BoundingRect } from '../models/types'

export default defineComponent({
    name: 'Tooltip',
    emits: ['close-others'],
    props: {
        title: {
            type: String,
            default: '',
        },
        itemRect: {
            type: Object as PropType<BoundingRect>,
            default: { top: 0, left: 0, width: 0, height: 0 },
            validator: (item: BoundingRect) =>
                item.hasOwnProperty('top') &&
                item.hasOwnProperty('left') &&
                item.hasOwnProperty('width') &&
                item.hasOwnProperty('height'),
        },
    },
    methods: {
        handleClick() {
            this.toggled = !this.toggled
            if (this.toggled) {
                this.$emit('close-others', this.title)
            }
        },
    },
    data() {
        return {
            toggled: false,
        }
    },
})
</script>

<template>
    <div>
        <div
            :style="`
            top: ${itemRect?.top ?? 0}px;
            left: ${itemRect?.left ?? 0}px;
            width: ${itemRect?.width ?? 0}px;
            height: ${itemRect?.height ?? 0}px;
            `"
            class="clicky"
            @click="handleClick"
        ></div>
        <div
            v-if="toggled"
            class="tooltip-container"
            :style="`
            top: ${itemRect?.top - 70}px;
            left: ${itemRect?.left + 80}px;
            `"
        >
            <div class="tooltip">
                <div
                    @click="handleClick"
                    class="x"
                >
                    x
                </div>
                <div class="text">{{ title }}</div>
            </div>
            <div class="triangle"></div>
        </div>
    </div>
</template>

<style scoped>
.clicky {
    background: rgba(170, 241, 255, 0.32);
    border: 1px dashed rgba(147, 208, 255, 0.9);
    position: absolute;
    cursor: pointer;
}

.clicky:hover {
    background: rgba(170, 241, 255, 0.55);
    border: 1px solid rgba(147, 208, 255, 0.99);
}

.tooltip {
    background: #2287ab;
    color: black;
    cursor: default;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    row-gap: 10px;
    justify-content: start;
    margin-bottom: 0;
    align-items: center;
    width: fit-content;
    height: fit-content;
}

.tooltip-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 10px;
}

.x {
    cursor: pointer;
    margin-left: 10px;
    margin-right: -10px;
    padding-bottom: 20px;
    color: #2d2d2d;
    font-size: small;
}

.text {
    margin: 10px 20px;
}

.triangle {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #2287ab;
    margin-top: 0;
    place-self: center;
}
</style>
