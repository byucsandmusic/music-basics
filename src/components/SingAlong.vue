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
    },
    components: {
        MusicNotation,
    },
})
</script>

<template>
    <h2>{{ translator.get('general', 'singAlong', 'title') }}</h2>
    <p>{{ translator.get('general', 'singAlong', 'description') }}</p>
    <MusicNotation
        :music="music"
        :translator="translator"
        highlightColor="#ff9d00"
        click-to-play
        display-midi-player
        midi-on-top
    />
</template>

<style scoped lang="sass"></style>
