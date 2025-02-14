<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../models/translator'
import Tooltip from '../components/Tooltip.vue'
import { BoundingRect } from '../models/types'

export default defineComponent({
    name: 'Interactive',
    components: { Tooltip },
    props: {
        translator: {
            type: Translator,
            required: true,
        },
    },
    data() {
        return {
            imageRect: null,
        }
    },
    computed: {
        clickables() {
            return this.translator
                .get('module1', 'interactive', 'tooltips', 'list')
                .split('/')
                .map((title: string) => ({ title, toggled: false }))
        },
    },
    methods: {
        getTooltipPlacement(title: string): BoundingRect {
            if (this.imageRect) {
                const { top, left } = this.imageRect
                const adjustRect = (
                    topAdj: number,
                    leftAdj: number,
                    width: number,
                    height: number
                ) => ({
                    top: (top ?? 0) + topAdj,
                    left: (left ?? 0) + leftAdj,
                    width,
                    height,
                })
                const args = ['module1', 'interactive', 'tooltips']

                switch (title) {
                    case this.translator.get(...args, 'tempo'):
                        return adjustRect(64, 64, 81, 12)
                    case this.translator.get(...args, 'title'):
                        return adjustRect(35, 116, 275, 20)
                    case this.translator.get(...args, 'scriptures'):
                        return adjustRect(54, 213, 82, 10)
                    case this.translator.get(...args, 'guitar'):
                        return adjustRect(74, 372, 15, 13)
                    case this.translator.get(...args, 'introStart'):
                        return adjustRect(82, 75, 10, 10)
                    case this.translator.get(...args, 'introEnd'):
                        return adjustRect(220, 459, 10, 10)
                    case this.translator.get(...args, 'timeSig'):
                        return adjustRect(94, 65, 15, 20)
                    case this.translator.get(...args, 'key'):
                        return adjustRect(94, 53, 11, 20)
                    case this.translator.get(...args, 'verseInfo'):
                        return adjustRect(116, 54, 25, 10)
                    case this.translator.get(...args, 'perform'):
                        return adjustRect(671, 33, 166, 10)
                    case this.translator.get(...args, 'text'):
                        return adjustRect(691, 33, 164, 10)
                    case this.translator.get(...args, 'music'):
                        return adjustRect(701, 33, 163, 20)
                    case this.translator.get(...args, 'copyright'):
                        return adjustRect(721, 34, 96, 8)
                    case this.translator.get(...args, 'tune'):
                        return adjustRect(711, 198, 35, 10)
                    default:
                        return this.imageRect
                }
            } else {
                return this.imageRect
            }
        },
        handleToggle(title: string) {
            for (let i = 0; i < this.clickables.length; i++) {
                if (this.clickables[i].title !== title) {
                    this.clickables[i].toggled = !this.clickables[i].toggled
                }
            }
        },
    },
    mounted() {
        this.imageRect = (({ top, left }) => ({
            top,
            left,
            width: 0,
            height: 0,
        }))(this.$refs.image.getBoundingClientRect())
    },
})
</script>

<template>
    <div
        class="image"
        ref="image"
    >
        <img
            src="/src/assets/hymns/HeIsBornTheChristChild.png"
            alt="hymn"
            class="image"
        />
    </div>
    <Tooltip
        v-for="item in clickables"
        :key="item.title"
        :title="item.title"
        :itemRect="getTooltipPlacement(item.title)"
        :toggled="item.toggled"
        @close-others="handleToggle"
    ></Tooltip>
</template>

<style scoped>
.image {
    height: 80vh;
    width: 55vh;
}
</style>
