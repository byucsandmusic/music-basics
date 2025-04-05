<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../../models/translator'
import MatchTheSong from '../../components/DragAndDrop/MatchTheSong.vue'
import { songs } from '../../models/songs'
import { isolateSheet, subsheet } from '../../utils/musicManipulator'

export default defineComponent({
    name: 'SecondMatchTheSong',
    props: {
        translator: {
            type: Translator,
            required: true,
        },
    },
    components: {
        MatchTheSong,
    },
    data() {
        return {
            sheets: [
                isolateSheet(subsheet(0, 1, songs.as_bread_is_broken)),
                isolateSheet(subsheet(1, 1, songs.as_bread_is_broken)),
                isolateSheet(subsheet(2, 1, songs.as_bread_is_broken)),
                isolateSheet(subsheet(2, 1, songs.as_bread_is_broken)),
            ],
        }
    },
    methods: {},
})
</script>

<template>
    <section>
        <h2>{{ translator.get('module0', 'pitchMatchingTunesNew', 'title') }}</h2>
        <MatchTheSong
            id="secondMatchTheSong"
            :sheets="sheets"
            :translator="translator"
            :progress-info="{ moduleName: 'module0', id: 'pitch-matching-tunes-new' }"
            :flavor-text="translator.get('module0', 'pitchMatchingTunesNew', 'description')"
            display-midi-player
            midi-on-top
        />
    </section>
</template>

<style lang="sass"></style>
