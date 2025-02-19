<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../../models/translator'
import Tooltip from '../../components/Interactive/Tooltip.vue'
import { BoundingRect } from '../../models/types'

const args = ['module1', 'interactive', 'tooltips']

export default defineComponent({
    name: 'Interactive',
    components: { Tooltip },
    props: {
        translator: {
            type: Translator,
            required: true,
        },
    },
    computed: {
        clickables() {
            const items = this.translator
                .get(...args, 'list')
                .split('/')
                .map((key: string) => ({
                    key,
                    title: this.translator.get(...args, key, 'title'),
                    body: this.translator.get(...args, key, 'body'),
                }))

            items[3]['link'] =
                'https://www.churchofjesuschrist.org/study/scriptures/nt/luke/2?lang=eng&id=p6-p14#p6'
            items[4]['link'] =
                'https://www.churchofjesuschrist.org/study/scriptures/ot/isa/9?lang=eng&id=p6#p6'

            return items
        },
    },
    methods: {
        getTooltipPlacement(title: string): BoundingRect {
            const makeRect = (
                top: number,
                left: number,
                width: number,
                height: number
            ) => ({ top, left, width, height })

            switch (title) {
                case this.translator.get(...args, 'title', 'title'):
                    return makeRect(3.5, 21.5, 56, 2.8)
                case this.translator.get(...args, 'john', 'title'):
                    return makeRect(6.6, 41, 9, 1)
                case this.translator.get(...args, 'isaiah', 'title'):
                    return makeRect(6.6, 50.5, 7.3, 1)
                case this.translator.get(...args, 'tempo', 'title'):
                    return makeRect(7.6, 11, 16, 1.5)
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
                case this.translator.get(...args, 'verseInfo', 'title'):
                    return makeRect(15.1, 8.4, 5, 1)
                case this.translator.get(...args, 'bass', 'title'):
                    return makeRect(22, 5.4, 3, 2.7)
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
        closeOtherTooltips(keyToKeep: string) {
            Object.keys(this.$refs)
                .filter(
                    (key) =>
                        key.includes('tooltip') &&
                        key !== `${keyToKeep}_tooltip`
                )
                .map((key) => this.$refs[key][0].close())
        },
    },
})
</script>

<template>
    <div class="img-container">
        <Tooltip
            v-for="item in clickables"
            :body="item.body"
            :clickableRect="getTooltipPlacement(item.title)"
            :id="item.key"
            :key="item.title"
            :link="item.link"
            :ref="`${item.key}_tooltip`"
            :title="item.title"
            @close-others="closeOtherTooltips"
        />
        <img
            ref="image"
            src="/src/assets/hymns/HeIsBornTheDivineChristChild.jpeg"
            alt="The Hymn: He Is Born, The Divine Christ Child"
        />
    </div>
</template>

<style scoped lang="sass">
.img-container
    position: relative
    width: min(980px, 100%)
</style>
