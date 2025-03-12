<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../../models/translator'
import MatchTheSong from '../../components/DragAndDrop/MatchTheSong.vue'
import { songs } from '../../models/songs'
import { removeVerses, subsheet } from '../../utils/musicManipulator'

export default defineComponent({
    name: 'MatchTheSongDemo',
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
                subsheet(0, 1, songs.i_am_a_child_of_god),
                subsheet(1, 1, songs.i_am_a_child_of_god),
                subsheet(2, 1, songs.i_am_a_child_of_god),
                subsheet(3, 1, songs.i_am_a_child_of_god),
            ],
            buckets: new Map(),
            textIndicator: 'Drag an image into its matching square!',
        }
    },
    methods: {},
})
</script>

<template>
    <section>
        <MatchTheSong
            :sheets="sheets"
            :translator="translator"
            display-midi-player
            midi-on-top
        />
    </section>
</template>

<style lang="sass"></style>
