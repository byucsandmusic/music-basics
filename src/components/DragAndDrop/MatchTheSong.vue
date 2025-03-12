<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Translator from '../../models/translator'
import Draggable from '../../components/DragAndDrop/Draggable.vue'
import DragTarget from '../../components/DragAndDrop/DragTarget.vue'
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop.vue'
import MusicNotation from '../MusicNotation.vue'
import { Music } from '../../models/types'

export default defineComponent({
    name: 'MatchTheSong',
    props: {
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
            textIndicator: 'Place the sheet music you hear into the box above!',
        }
    },
    methods: {
        onRelease(from, to, state) {
            this.buckets = state

            this.textIndicator = 'Sheet music dropped.'
        },
        validBucket(from, to) {
            return true
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

        <DragAndDrop
            :onRelease="onRelease"
            :validBucket="validBucket"
        >
            What song do you hear?
            <div class="targets">
                <span class="targetContainer">
                    <span
                        :class="{ isCorrect: false }"
                        class="correctnessIndicator"
                    ></span>
                    <span>
                        <DragTarget :id="`song-target`"></DragTarget>
                    </span>
                </span>
            </div>
            <div class="draggables">
                <Draggable id="first">
                    <MusicNotation
                        :music="sheets[0]"
                        :translator="translator"
                    />
                </Draggable>
                <Draggable id="second">
                    <MusicNotation
                        :music="sheets[1]"
                        :translator="translator"
                    />
                </Draggable>
                <Draggable id="third">
                    <MusicNotation
                        :music="sheets[2]"
                        :translator="translator"
                    />
                </Draggable>
                <Draggable id="third">
                    <MusicNotation
                        :music="sheets[3]"
                        :translator="translator"
                    />
                </Draggable>
            </div>
            <span style="height: 100px"></span>
            <span>{{ textIndicator }}</span>
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
