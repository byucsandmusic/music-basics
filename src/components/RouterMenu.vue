<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { LinkItem } from '../models/types'
import Dropdown from './Dropdown.vue'

/**
 * This component allows the items of a nested menu to be router links
 * @prop links LinkItems inherit from DropdownItems
 * @prop title The title for the nested menu e.g. 'Module 1'
 */
export default defineComponent({
    name: 'RouterMenu',
    components: { Dropdown },
    props: {
        links: {
            type: Array as PropType<LinkItem[]>,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    computed: {
        linksInMenu() {
            return this.links.filter(({ notInMenu }) => !notInMenu || false)
        },
    },
})
</script>

<template>
    <Dropdown
        :items="linksInMenu"
        :title="title"
    >
        <!--    This is a Scoped Slot, which means that the child component passes props back up to the parent-->
        <template #itemSlot="props">
            <RouterLink :to="props.currentItem.href">
                {{ props.currentItem.title }}
            </RouterLink>
        </template>
    </Dropdown>
</template>

<style scoped></style>
