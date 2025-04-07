<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../../models/translator'
import MatchTheSong from '../../components/DragAndDrop/MatchTheSong.vue'
import { songs } from '../../models/songs'
import { isolateSheet, removeVerses, subsheet } from '../../utils/musicManipulator'

export default defineComponent({
    name: 'FirstMatchTheSong',
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
                isolateSheet(subsheet(0, 1, songs.i_am_a_child_of_god)),
                isolateSheet(subsheet(1, 1, songs.i_am_a_child_of_god)),
                isolateSheet(subsheet(2, 1, songs.i_am_a_child_of_god)),
                isolateSheet(subsheet(3, 1, songs.i_am_a_child_of_god)),
            ],
        }
    },
    methods: {},
})
</script>

<template>
    <section>
        <h2>{{ translator.get('module0', 'pitchMatchingTunesCommon', 'title') }}</h2>
        <MatchTheSong
            id="firstMatchTheSong"
            :sheets="sheets"
            :translator="translator"
            :progress-info="{ moduleName: 'module0', id: 'firstMatch' }"
            :flavor-text="translator.get('module0', 'pitchMatchingTunesCommon', 'description')"
            display-midi-player
            midi-on-top
        />
    </section>
</template>

<style lang="sass" scoped></style>
