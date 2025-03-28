<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Translator from '../../models/translator'
import { BoundingRect } from '../../models/types'
import ClickableArea from '../../components/Exploration/ClickableArea.vue'

const args = ['module1', 'explore', 'tooltips']

export default defineComponent({
    name: 'Exploration',
    components: { ClickableArea },
    props: {
        translator: {
            type: Translator,
            required: true,
        },
        descriptionPath: {
            type: Array as PropType<string[]>,
            required: true,
        },
    },
    data() {
        return {
            imgRect: {} as BoundingRect,
        }
    },
    computed: {
        clickables() {
            return this.translator
                .get(...args, 'list')
                .split('/')
                .map((key: string) => ({
                    key,
                    title: this.translator.get(...args, key, 'title'),
                    body: this.translator.get(...args, key, 'body'),
                }))
        },
    },
    methods: {
        closeOtherTooltips(keyToKeep: string): void {
            Object.keys(this.$refs)
                .filter((key) => key.includes('tooltip') && key !== `${keyToKeep}_tooltip`)
                .map((key) => this.$refs[key][0].close())
        },
        getTooltipPlacement(title: string): BoundingRect {
            const makeRect = (top: number, left: number, width: number, height: number) => ({
                top,
                left,
                width,
                height,
            })

            switch (title) {
                case this.translator.get(...args, 'title', 'title'):
                    return makeRect(3.5, 21.5, 56, 2.8)
                case this.translator.get(...args, 'scriptures', 'title'):
                    return makeRect(6.6, 41, 16.75, 1.2)
                case this.translator.get(...args, 'tempo', 'title'):
                    return makeRect(7.6, 11, 6.5, 1.5)
                case this.translator.get(...args, 'conductorNotes', 'title'):
                    return makeRect(7.6, 18, 9, 1.5)
                case this.translator.get(...args, 'guitar', 'title'):
                    return makeRect(9, 74, 2.75, 2)
                case this.translator.get(...args, 'introStart', 'title'):
                    return makeRect(10.3, 12.7, 2.2, 1.3)
                case this.translator.get(...args, 'treble', 'title'):
                    return makeRect(10.6, 5.6, 2.6, 5)
                case this.translator.get(...args, 'key', 'title'):
                    return makeRect(11.7, 8.7, 1.7, 2.7)
                case this.translator.get(...args, 'timeSig', 'title'):
                    return makeRect(11.7, 11.2, 2, 2.7)
                case this.translator.get(...args, 'barLines', 'title'):
                    return makeRect(11.7, 33.5, 1.3, 2.7)
                case this.translator.get(...args, 'verseInfo', 'title'):
                    return makeRect(15.1, 8.4, 5, 1)
                case this.translator.get(...args, 'bass', 'title'):
                    return makeRect(22, 5.4, 3, 2.7)
                case this.translator.get(...args, 'measure', 'title'):
                    return makeRect(22.2, 34, 16.6, 2.7)
                case this.translator.get(...args, 'introEnd', 'title'):
                    return makeRect(29, 91.5, 2.2, 1.3)
                case this.translator.get(...args, 'slur', 'title'):
                    return makeRect(52.4, 44.3, 7.4, 2.5)
                case this.translator.get(...args, 'toRefrain', 'title'):
                    return makeRect(69, 87.7, 6.3, 1.2)
                case this.translator.get(...args, 'fermata', 'title'):
                    return makeRect(69.5, 84.7, 2.75, 1.6)
                case this.translator.get(...args, 'perform', 'title'):
                    return makeRect(91, 4.3, 34, 1.5)
                case this.translator.get(...args, 'text', 'title'):
                    return makeRect(93.8, 4.5, 33, 1.2)
                case this.translator.get(...args, 'music', 'title'):
                    return makeRect(95.3, 4.5, 33, 2.75)
                case this.translator.get(...args, 'copyright', 'title'):
                    return makeRect(98.3, 4.6, 19.2, 1)
                case this.translator.get(...args, 'tune', 'title'):
                    return makeRect(96.7, 38.3, 6.5, 1.3)
                default:
                    return makeRect(0, 0, 0, 0)
            }
        },
    },
})
</script>

<template>
    <h2>{{ translator.get('module1', 'explore', 'title') }}</h2>
    <p class="content-item">{{ translator.get(...descriptionPath) }}</p>
    <div ref="img-container" class="img-container">
        <ClickableArea
            v-for="item in clickables"
            :key="item.key"
            :ref="`${item.key}_tooltip`"
            :clickableRect="getTooltipPlacement(item.title)"
            :item="item"
            @close-others="closeOtherTooltips"
        />
        <img
            ref="image"
            alt="The Hymn: He Is Born, The Divine Christ Child"
            src="/src/assets/hymns/HeIsBornTheDivineChristChild.jpeg"
        />
    </div>
</template>

<style scoped lang="sass">
.content-item
    max-width: 1000px
.img-container
    position: relative
    width: min(980px, 100%)
</style>
