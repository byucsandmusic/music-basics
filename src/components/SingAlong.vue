<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Translator from '../models/translator'
import { Music } from '../models/types'
import MusicNotation from './MusicNotation.vue'

export default defineComponent({
    name: 'SingAlong',
    props: {
        music: {
            type: Object as PropType<Music>,
            required: true,
        },
        translator: {
            type: Translator,
            required: true,
        },
        title: {
            type: Array<string>,
        },
        description: {
            type: Array<string>,
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
        :key="JSON.stringify(music)"
        :music="music"
        :translator="translator"
        highlightColor="#ff9d00"
        click-to-play
        display-midi-player
        midi-on-top
        fit-to-page
    />
</template>

<style scoped lang="sass"></style>
