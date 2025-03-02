<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../../models/translator'
import Draggable from '../../components/DragAndDrop/Draggable.vue'
import DragTarget from '../../components/DragAndDrop/DragTarget.vue'
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop.vue'

export default defineComponent({
    name: 'DragAndDropDemo',
    props: {
        translator: Translator,
    },
    components: {
        DragAndDrop,
        Draggable,
        DragTarget,
    },
    data() {
        return {
            buckets: new Map(),
            textIndicator: 'Drag an image into its matching square!',
        }
    },
    methods: {
        onRelease(from, to, state) {
            this.buckets = state
            switch (from + to) {
                case 'eighth-draggableeighth-target':
                case 'quarter-draggablequarter-target':
                case 'half-draggablehalf-target':
                case 'whole-draggablewhole-target':
                    this.textIndicator = 'Correct!'
                    break

                default:
                    if (to)
                        this.textIndicator = `Sorry, this isn't a ${to.split('-')[0]} note. Try again!`
                    else
                        this.textIndicator =
                            'Please drop the notes into a valid slot.'
                    break
            }
        },
        validBucket(from, to) {
            return to.includes(from.split('-')[0])
        },
    },
})
</script>

<template>
    <section>
        <DragAndDrop
            :onRelease="onRelease"
            :validBucket="validBucket"
        >
            Move items into the correct spots!
            <div class="draggables">
                <Draggable id="eighth-draggable">
                    <img src="/src/assets/dragAndDrop/eighthNote.webp" />
                </Draggable>
                <Draggable id="quarter-draggable">
                    <img src="/src/assets/dragAndDrop/quarterNote.webp" />
                </Draggable>
                <Draggable id="half-draggable">
                    <img src="/src/assets/dragAndDrop/halfNote.webp" />
                </Draggable>
                <Draggable id="whole-draggable">
                    <img src="/src/assets/dragAndDrop/wholeNote.webp" />
                </Draggable>
            </div>
            <span style="height: 100px"></span>
            <div class="targets">
                <span
                    class="targetContainer"
                    v-for="len in ['eighth', 'quarter', 'half', 'whole']"
                >
                    <span
                        :class="{ isCorrect: buckets.get(len + '-target') }"
                        class="correctnessIndicator"
                    ></span>
                    <span>
                        {{ len }}
                        <DragTarget :id="`${len}-target`"></DragTarget>
                    </span>
                </span>
            </div>
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
    height: 100px
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
    width: 100px
    height: 100px

.dragTarget
    display: block
    width: 100px
    height: 100px
    outline: 1px solid black


.isCorrect
    background-color: #43A047

.isIncorrect
    background-color: #E53935
</style>
