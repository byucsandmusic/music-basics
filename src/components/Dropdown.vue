<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DropdownItem } from '../models/types'

/**
 * This component can either be used as a normal dropdown, or for a nested menu. If used as a normal dropdown,
 * the selected item will be displayed as the title. If as menu, the given title will always be displayed.
 * @prop items an array of DropdownItems which will be displayed
 * @prop title if a title is passed in, the component will function as a nested menu
 */
export default defineComponent({
    name: 'Dropdown',
    props: {
        items: {
            type: Array as PropType<DropdownItem[]>,
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            displayTitle: this.items[0]?.title ?? '',
        }
    },
    methods: {
        toggleSelected(title: string) {
            this.displayTitle = title
            this.$refs.details.removeAttribute('open')
        },
    },
})
</script>

<template>
    <details
        class="dropdown"
        ref="details"
    >
        <summary>{{ title || displayTitle }}</summary>
        <ul>
            <li
                v-for="item in items"
                :key="item.id"
                @click="toggleSelected(item.title)"
            >
                <slot
                    name="itemSlot"
                    :currentItem="item"
                >
                    <!-- this link to nowhere is part of the hover styling through PicoCSS, this could be removed
              later if we change the styling architecture in this project -->
                    <a href="#">{{ item.title }}</a>
                </slot>
            </li>
        </ul>
    </details>
</template>

<style scoped lang="sass"></style>
