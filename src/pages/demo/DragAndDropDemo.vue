<script lang="ts">
import { defineComponent, onMounted } from 'vue'
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
                    this.textIndicator = `Sorry, those note(s) are not ${to.split('-')[0]} notes`
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
                    :class="{
                        // //todo clean this up
                        isCorrect: buckets.get(len + '-target'),
                    }"
                    class="correctnessIndicator"
                ></span>
                <span>
                    {{ len }}
                    <DragTarget :id="`${len}-target`"></DragTarget>
                </span>
            </span>
        </div>
        <span>{{ $data.textIndicator }}</span>
    </DragAndDrop>
</template>

<style lang="sass" scoped>
.draggables
    display: flex
    flex-flow: row wrap

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

.isCorrect
    background-color: #43A047

.isIncorrect
    background-color: #E53935
</style>
