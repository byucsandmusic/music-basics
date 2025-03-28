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
                    return makeRect(0.8, 35, 30, 2.8)
                case this.translator.get(...args, 'scriptures', 'title'):
                    return makeRect(3.9, 36, 28, 1.3)
                case this.translator.get(...args, 'tempo', 'title'):
                    return makeRect(4.9, 10, 6, 2)
                case this.translator.get(...args, 'guitar', 'title'):
                    return makeRect(7.3, 63.5, 1.4, 1.4)
                case this.translator.get(...args, 'introEnd', 'title'):
                    return makeRect(8.3, 73.7, 2.1, 1.3)
                case this.translator.get(...args, 'introStart', 'title'):
                    return makeRect(8.3, 12, 1.8, 1.3)
                case this.translator.get(...args, 'treble', 'title'):
                    return makeRect(8.5, 6.5, 2.8, 6)
                case this.translator.get(...args, 'timeSig', 'title'):
                    return makeRect(10, 10.1, 1.8, 2.9)
                case this.translator.get(...args, 'barLines', 'title'):
                    return makeRect(10, 30.6, 1.3, 2.9)
                case this.translator.get(...args, 'bass', 'title'):
                    return makeRect(26.6, 6.6, 3, 3)
                case this.translator.get(...args, 'measure', 'title'):
                    return makeRect(26.6, 31, 31.5, 3.5)
                case this.translator.get(...args, 'slur', 'title'):
                    return makeRect(51, 41, 6, 2.3)
                case this.translator.get(...args, 'perform', 'title'):
                    return makeRect(89, 5.5, 87, 6.6)
                case this.translator.get(...args, 'music', 'title'):
                    return makeRect(97, 5.5, 27, 1.6)
                case this.translator.get(...args, 'copyright', 'title'):
                    return makeRect(99, 5.7, 5.5, 0.8)
                case this.translator.get(...args, 'tune', 'title'):
                    return makeRect(97.2, 33.4, 10.2, 1.3)
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
        <img ref="image" alt="The Hymn: As Bread is Broken" src="/src/assets/hymns/AsBreadIsBroken.png" />
    </div>
</template>

<style scoped lang="sass">
.content-item
    max-width: 1000px
.img-container
    position: relative
    width: min(980px, 100%)
</style>
