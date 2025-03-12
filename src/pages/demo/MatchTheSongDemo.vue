<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../../models/translator'
import MatchTheSong from '../../components/DragAndDrop/MatchTheSong.vue'

export default defineComponent({
    name: 'MatchTheSongDemo',
    props: {},
    components: {
        MatchTheSong,
    },
    data() {
        return {
            buckets: new Map(),
            textIndicator: 'Drag an image into its matching square!',
        }
    },
    methods: {},
})
</script>

<template>
    <section>
        <MatchTheSong></MatchTheSong>
    </section>
</template>

<style lang="sass"></style>
