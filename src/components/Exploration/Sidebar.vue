<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ExplorationItem } from '../../models/explorationItem'
import CloseIcon from '../CloseIcon.vue'

export default defineComponent({
    name: 'Sidebar',
    components: { CloseIcon },
    emits: ['toggle'],
    props: {
        item: {
            type: Object as PropType<ExplorationItem>,
            required: true,
        },
    },
    methods: {
        handleClose() {
            this.$emit('toggle')
        },
    },
})
</script>

<template>
    <div class="sidebar">
        <div>
            <div class="header">
                <CloseIcon @close="handleClose" />
                <div>{{ item.title }}</div>
            </div>
            <div class="body" v-html="item.body" />
        </div>
    </div>
</template>

<style scoped lang="sass">
.body
    margin: 0.5rem 0.75rem

.close-icon
    cursor: pointer
    padding-left: 1vh

.header
    display: flex
    flex-direction: row
    background: $accent-color
    color: $secondary-text

.sidebar
    position: fixed
    height: 100%
    top: 0
    left: 70%
    color: $primary-text
    background: $primary-background
    z-index: 20
    overflow-y: auto

::-webkit-scrollbar-track
    margin-bottom: 0

@media (prefers-color-scheme: dark)
    .body
        color: $secondary-text
    .header
        background: $accent-color-dark
        color: $primary-text
    .sidebar
        background: $secondary-background-dark
</style>
