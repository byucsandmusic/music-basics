<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getModuleProgress, resetModuleProgress } from '../models/progress'
import Translator from '../models/translator'

export default defineComponent({
    props: {
        translator: {
            type: Translator,
            required: true,
        },
        moduleName: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const progress = ref<{ [key: string]: boolean }>({})
        const router = useRouter()

        const loadProgress = () => {
            progress.value = getModuleProgress(props.moduleName)
        }

        const resetProgress = () => {
            resetModuleProgress(props.moduleName)
            loadProgress()
        }

        onMounted(loadProgress)

        // Function to convert kebab-case to camelCase
        function toCamelCase(str: string): string {
            return str
                .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
                    index === 0 ? match.toLowerCase() : match.toUpperCase()
                )
                .replace(/[\s-]+/g, '')
                .replace(/(\d+)/g, (match) => match)
        }

        // Convert component keys into human-readable titles using the translator
        const progressWithTitles = computed(() => {
            return Object.entries(progress.value).map(([component, done]) => {
                const camelCaseComponent = toCamelCase(component)
                const readableTitle =
                    props.translator.get(...[props.moduleName, camelCaseComponent, 'title']) || component
                return { component, readableTitle, done }
            })
        })

        return { progressWithTitles, router, resetProgress }
    },
})
</script>

<template>
    <div class="progress-container">
        <h2 class="progress-title">Progress</h2>
        <ul class="progress-list">
            <li v-for="{ component, readableTitle, done } in progressWithTitles" :key="component" class="progress-item">
                <router-link :to="`/${moduleName}/${component}`" class="progress-link">
                    <i :class="done ? 'fa-regular fa-square-check' : 'fa-regular fa-square'" class="progress-icon"></i>
                    <span class="progress-text">{{ readableTitle }}</span>
                </router-link>
            </li>
        </ul>
        <button class="reset-button" @click="resetProgress">Reset Progress</button>
    </div>
</template>

<style lang="sass" scoped>
.progress-container
    position: relative
    display: flex
    flex-direction: column
    background: $secondary-background
    padding: 1rem
    max-width: 1000px
    margin: 0 auto
    border-radius: 10px
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1)

.progress-title
    text-align: center
    font-size: 1.25rem
    font-weight: bold
    margin-bottom: 1rem
    color: black

.progress-list
    display: grid
    grid-template-columns: 1fr
    gap: 30px
    padding: 0
    margin: 0
    list-style: none
    flex-grow: 1

    @media (min-width: 600px)
        grid-template-columns: 1fr 1fr

.progress-item
    list-style: none
    padding: 8px 0
    color: black

.progress-link
    display: flex
    align-items: center
    gap: 10px
    text-decoration: none
    color: inherit
    transition: transform 0.2s ease-in-out

    &:hover
        transform: scale(1.05)

.progress-icon
    width: 24px
    height: 24px
    color: green

.progress-text
    font-size: 1rem
    font-weight: 500

.reset-button
    padding: 8px 12px
    font-size: 0.9rem
    font-weight: bold
    color: white
    border: none
    border-radius: 5px
    cursor: pointer
    transition: background 0.3s ease-in-out, transform 0.2s ease-in-out
    margin-top: 10px
    max-width: 200px
    width: 100%
    align-self: center

    &:hover
        background: darkred
        transform: scale(1.05)

.dark-mode
    .progress-container
        background: $secondary-background-dark

    .progress-title
        color: white

    .progress-item
        color: white

    .progress-icon
        color: lightgreen
</style>
