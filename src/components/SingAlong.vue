<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Translator from '../models/translator'
import { Music } from '../models/types'
import MusicNotation from './MusicNotation.vue'

export default defineComponent({
    name: 'SingAlong',
    props: {
        description: {
            type: Array<string>,
        },
        music: {
            type: Object as PropType<Music>,
            required: true,
        },
        staffWidth: {
            type: Number,
            default: 740,
        },
        title: {
            type: Array<string>,
        },
        translator: {
            type: Translator,
            required: true,
        },
    },
    components: {
        MusicNotation,
    },
})
</script>

<template>
    <h2 v-if="title">{{ translator.get(...title) }}</h2>
    <p v-if="description">{{ translator.get(...description) }}</p>
    <MusicNotation
        :key="JSON.stringify(music) + ` ${title ?? ''}`"
        :music="music"
        :staff-width="staffWidth"
        :translator="translator"
        highlightColor="#ff9d00"
        click-to-play
        display-midi-player
        midi-on-top
        fit-to-page
    />
</template>

<style scoped lang="sass"></style>
