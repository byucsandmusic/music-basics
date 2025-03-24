<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Translator from '../../models/translator'
import Draggable from '../../components/DragAndDrop/Draggable.vue'
import DragTarget from '../../components/DragAndDrop/DragTarget.vue'
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop.vue'
import MusicNotation from '../MusicNotation.vue'
import { Music } from '../../models/types'
import { createRandomIndexOrder } from '../../utils/misc'
import { progress, ProgressInfo } from '../../models/progress'

export default defineComponent({
    name: 'MatchTheSong',
    props: {
        id: {
            type: String,
            required: true,
        },
        translator: {
            type: Translator,
            required: true,
        },
        sheets: {
            type: Object as PropType<Music[]>,
            required: true,
            validator: function (value: Music[]) {
                return value.length > 0
            },
        },
        progressInfo: {
            type: Object as PropType<ProgressInfo>,
            required: true,
        },
    },
    components: {
        DragAndDrop,
        Draggable,
        DragTarget,
        MusicNotation,
    },
    data() {
        return {
            buckets: new Map(),
            textIndicator: 'Place your answer into the box below!',
            order: createRandomIndexOrder(this.sheets.length),
            correct: false,
        }
    },
    methods: {
        onRelease(from: string, to: string | null, state: Map<string, string | null>) {
            this.buckets = state
            if (from === this.id + 'Option0' && to != null) {
                this.textIndicator = 'Correct!'
                this.correct = true
                const progressHandler = progress(this.progressInfo)
                progressHandler.saveProgress(true)
            } else if (to != null) {
                this.textIndicator = 'Sorry, that is incorrect. Try again?'
                this.correct = false
            } else {
                this.textIndicator = 'Please place the sheet inside the box below'
                this.correct = false
            }
        },
        validBucket(from: string, to: string) {
            return from === this.id + 'Option0'
        },
    },
})
</script>

<template>
    <section>
        <MusicNotation
            :music="sheets[0]"
            :translator="translator"
            :displaySheetMusic="false"
            display-midi-player
            midi-on-top
        />

        <DragAndDrop :onRelease="onRelease" :validBucket="validBucket">
            What song do you hear?
            <span>{{ textIndicator }}</span>
            <div class="targets">
                <span class="targetContainer">
                    <span :class="{ isCorrect: correct }" class="correctnessIndicator"></span>
                    <span>
                        <DragTarget :id="`song-target`"></DragTarget>
                    </span>
                </span>
            </div>
            <div class="draggables">
                <Draggable :id="`${id}Option${i}`" v-for="i in order">
                    <MusicNotation :music="sheets[i]" :translator="translator" :staff-width="200" />
                </Draggable>
            </div>
            <span style="height: 100px"></span>
        </DragAndDrop>
    </section>
</template>

<style lang="sass">
section
    color: black
    background-color: white
    padding: 10px
    display: flex
    flex-flow: column nowrap
.draggables
    display: flex
    flex-flow: row wrap

.dragging
    transition: opacity 0.2s !important

.hovering-over-valid-target
    opacity: 0.5

.targets
    display: flex
    flex-flow: row

.targetContainer
    display: flex
    flex-flow: row
    text-transform: capitalize
    margin-right: 20px

.correctnessIndicator
    display: block
    width: 20px
    height: 300px
    background-color: white
    align-self: flex-end
    outline: black 1px solid
    background-color: #EEEEEE

.draggable
    display: inline-block
    border-radius: 10px
    padding: 10px
    outline: black 1px solid
    background-color: white
    width: 300px
    height: 300px

.dragTarget
    display: block
    width: 300px
    height: 300px
    outline: 1px solid black


.isCorrect
    background-color: #43A047

.isIncorrect
    background-color: #E53935
</style>
