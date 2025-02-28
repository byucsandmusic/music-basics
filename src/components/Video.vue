<script lang="ts">
import { computed, defineComponent } from 'vue'
import Translator from '../models/translator'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'VideoComponent',
    props: {
        translator: {
            type: Translator,
            required: true,
        },
        srcName: {
            type: String,
            default: 'singers',
        },
    },
    setup() {
        return { route: useRoute() }
    },
    computed: {
        src(): string {
            const modules = import.meta.glob('/src/assets/**/*', {
                eager: true,
            })
            return (
                modules[`/src/assets/videos/${this.srcName}.mp4`]?.default ?? ''
            )
        },
        title() {
            return this.translator.get(
                ...this.route.path.split('/').slice(1),
                'title'
            )
        },
    },
})
</script>

<template>
    <div>
        <h2>{{ title }}</h2>
        <video
            :key="srcName"
            width="100%"
            controls
        >
            <source
                :src="src"
                type="video/mp4"
            />
        </video>
        <div>{{ translator.get('general', 'loremIpsum') }}</div>
    </div>
</template>

<style scoped lang="sass"></style>
