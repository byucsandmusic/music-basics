<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Translator from '../models/translator'
import { Music } from '../models/music'
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
        :display-midi-player="true"
        :midi-on-top="true"
        :highlight-notes="true"
    />
</template>

<style scoped></style>
