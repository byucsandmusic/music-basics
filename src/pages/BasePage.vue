<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../models/translator'
import { useRoute } from 'vue-router'
import useNestedMenuItems from '../nestedMenuItems'

export default defineComponent({
    name: 'BasePage',
    setup({ translator }) {
        const menuItems = useNestedMenuItems(translator)
        const route = useRoute()
        return { route, menuItems }
    },
    props: {
        translator: {
            type: Translator,
            required: true,
        },
        translatorPath: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            prevDisabled: false,
            prev: '',
            nextDisabled: false,
            next: '',
        }
    },
    methods: {
        goTo(isPrev: boolean): void {
            this.$router.replace(isPrev ? this.prev : this.next)
        },
        parseNextAndPrev(path: string): void {
            const module = path.split('/')[1]
            const pageIndex = this.menuItems[module].indexOf(
                this.menuItems[module].find(({ href }) => href === path)
            )
            const otherModules = Object.keys(this.menuItems)
            const moduleIndex = otherModules.indexOf(module)

            if (pageIndex < 0) {
                this.prev = ''
                this.next = ''
                this.prevDisabled = true
                this.nextDisabled = true
            } else if (pageIndex === 0) {
                if (moduleIndex === 0) {
                    this.prev = '/home'
                    this.prevDisabled = false
                } else {
                    this.prev =
                        this.menuItems[otherModules[moduleIndex - 1]].at(
                            -1
                        ).href
                    this.prevDisabled = false
                }

                this.next = this.menuItems[module][pageIndex + 1].href
                this.nextDisabled = false
            } else if (pageIndex === this.menuItems[module].length - 1) {
                if (moduleIndex === otherModules.length - 1) {
                    this.next = ''
                    this.nextDisabled = true
                } else {
                    this.next =
                        this.menuItems[otherModules[moduleIndex + 1]].at(0).href
                    this.nextDisabled = false
                }

                this.prev = this.menuItems[module][pageIndex - 1].href
                this.prevDisabled = false
            } else {
                this.next = this.menuItems[module][pageIndex + 1].href
                this.nextDisabled = false
                this.prev = this.menuItems[module][pageIndex - 1].href
                this.prevDisabled = false
            }
        },
    },
    watch: {
        'route.path'(path) {
            this.parseNextAndPrev(path)
        },
    },
    mounted() {
        this.parseNextAndPrev(this.route.path)
    },
})
</script>

<template>
    <div>
        <h1>{{ translator.get(...translatorPath.split('/')) }}</h1>
        <div class="page-content">
            <RouterView #="{ Component }">
                <component
                    :is="Component"
                    :translator="translator"
                />
            </RouterView>
        </div>
        <div class="button-bar flex-row">
            <button
                :disabled="prevDisabled"
                @click="goTo(true)"
            >
                {{ translator.get('general', 'buttonBar', 'previous') }}
            </button>
            <button
                :disabled="nextDisabled"
                @click="goTo(false)"
            >
                {{ translator.get('general', 'buttonBar', 'next') }}
            </button>
        </div>
    </div>
</template>

<style scoped lang="sass">
.button-bar
    justify-content: space-between
    position: fixed
    padding: 10px
    bottom: 0
    left: 0
    right: 0
    height: 80px
    background: $secondary-background

.page-content
    margin-bottom: $button-bar-height
    > *
        margin-left: auto
        margin-right: auto

@media (prefers-color-scheme: dark)
    .button-bar
        background: $secondary-background-dark
</style>
