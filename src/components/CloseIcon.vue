<script lang="ts">
import { defineComponent } from 'vue'
import { useDarkMode } from '../utils/darkMode'

export default defineComponent({
    name: 'CloseIcon',
    setup() {
        return useDarkMode()
    },
    emits: ['close'],
    props: {
        color: {
            type: String,
            default: '',
        },
    },
    computed: {
        textColor() {
            return this.color.length
                ? this.color
                : `$${this.isDarkMode ? 'secondary' : 'primary'}-text`
        },
    },
})
</script>

<template>
    <div
        @click="$emit('close')"
        class="x"
    >
        x
    </div>
</template>

<style scoped lang="sass">
.x
    cursor: pointer
    margin-left: 10px
    margin-right: 0.2rem
    font-size: small
    align-self: start
    color: v-bind(textColor)
</style>
