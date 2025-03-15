<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import Translator from '../models/translator'

interface ContentItem {
    type: 'text' | 'image'
    value: string[]
}

export default defineComponent({
    name: 'TextAndImagesComponent',
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
        <div
            v-for="(item, index) in content"
            :key="index"
            class="content-item"
        >
            <p
                v-if="item.type === 'text'"
                style="white-space: pre-line"
            >
                {{ getTranslatedText(item.value) }}
            </p>
            <img
                v-else-if="item.type === 'image'"
                :src="getImageSrc(item.value[0])"
                alt="Content Image"
                class="content-image"
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

p
  text-align: left
  width: 100%
  max-width: 1000px
</style>
