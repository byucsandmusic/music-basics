<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../models/translator'
import { useCurrentPage } from '../utils/currentPage'

export default defineComponent({
    name: 'ButtonBar',
    setup({ translator }) {
        return useCurrentPage(translator)
    },
    props: {
        translator: {
            type: Translator,
            required: true,
        },
    },
    computed: {
        otherModules() {
            return Object.keys(this.menuItems)
        },
        moduleIndex() {
            return this.otherModules.indexOf(this.module)
        },
        prevPath() {
            if (this.pageIndex < 0) {
                return ''
            }

            if (this.pageIndex === 0 && this.moduleIndex === 0) {
                return '/home'
            }

            if (this.pageIndex === 0) {
                return this.menuItems[
                    this.otherModules[this.moduleIndex - 1]
                ].at(-1).href
            }

            return this.menuItems[this.module][this.pageIndex - 1].href
        },
        nextPath() {
            if (
                this.pageIndex < 0 ||
                (this.pageIndex === this.menuItems[this.module].length - 1 &&
                    this.moduleIndex === this.otherModules.length - 1)
            ) {
                return ''
            }

            if (this.pageIndex === this.menuItems[this.module].length - 1) {
                return this.menuItems[
                    this.otherModules[this.moduleIndex + 1]
                ].at(0).href
            }

            return this.menuItems[this.module][this.pageIndex + 1].href
        },
        prevDisabled() {
            return !this.prevPath.length
        },
        nextDisabled() {
            return !this.nextPath.length
        },
    },
    methods: {
        goTo(isPrev: boolean): void {
            this.$router.replace(isPrev ? this.prevPath : this.nextPath)
        },
    },
})
</script>

<template>
    <div class="button-bar flex-row">
        <button
            :disabled="prevDisabled"
            @click="goTo(true)"
        >
            <i class="fa-solid fa-backward"></i>
        </button>
        <div class="title">{{ translator.get(module, 'title') }}</div>
        <button
            :disabled="nextDisabled"
            @click="goTo(false)"
        >
            <i class="fa-solid fa-forward"></i>
        </button>
    </div>
</template>

<style scoped lang="sass">
.button-bar
    justify-content: space-between
    align-items: center
    padding: 10px

.title
    font-size: larger
    font-weight: bold
    padding: 0
    margin: 0
    place-self: center

button
    min-width: 40px
</style>
