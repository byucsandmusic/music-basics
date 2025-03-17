<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import Translator from '../models/translator'
import MusicNotation from './MusicNotation.vue'

interface ContentItem {
    type: 'text' | 'image' | 'music'
    value?: string[]
    music?: {
        meter: string
        tempo: string
        beat: string
        treble: string[]
        instrument: number
    }
}

export default defineComponent({
    name: 'TextImagesAndMusicComponent',
    components: {
        MusicNotation,
    },
    props: {
        translator: {
            type: Translator,
            required: true,
        },
        titleKeys: {
            type: Array as PropType<string[]>,
            required: true,
        },
        content: {
            type: Array as PropType<ContentItem[]>,
            required: true,
        },
    },
    setup(props) {
        const images = import.meta.glob('/src/assets/images/**/*', {
            eager: true,
        })

        const getImageSrc = (filename: string) => {
            return images[`/src/assets/images/${filename}`]?.default ?? ''
        }

        const getTranslatedText = (keys: string[]) => {
            return props.translator.get(...keys)
        }

        const title = computed(() => props.translator.get(...props.titleKeys))

        return { getImageSrc, getTranslatedText, title }
    },
})
</script>

<template>
    <h2>{{ title }}</h2>
    <div class="content-container">
        <div v-for="(item, index) in content" :key="index" class="content-item">
            <p v-if="item.type === 'text' && item.value?.[0]" style="white-space: pre-line">
                {{ getTranslatedText(item.value) }}
            </p>
            <img
                v-else-if="item.type === 'image' && item.value?.[0]"
                :src="getImageSrc(item.value[0])"
                alt="Content Image"
                class="content-image"
            />
            <MusicNotation
                class="music-notation"
                v-else-if="item.type === 'music'"
                v-if="item.music"
                :music="item.music"
                :translator="translator"
                click-to-play
            />
        </div>
    </div>
</template>

<style scoped lang="sass">
.content-container
  display: flex
  flex-direction: column
  gap: 10px

.content-item
  display: flex
  justify-content: center

.content-image
  max-width: 100%
  height: auto
  max-width: 1000px

.music-notation
  max-width: 100%
  height: auto
  max-width: 1000px

p
  text-align: left
  width: 100%
  max-width: 1000px
</style>
