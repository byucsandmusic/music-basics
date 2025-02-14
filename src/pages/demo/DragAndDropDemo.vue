<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Translator from '../../models/translator'
import DragAndDrop, {
    DragReleaseEvent,
} from '../../components/DragAndDrop/DragAndDrop.vue'
import Draggable from '../../components/DragAndDrop/Draggable.vue'
import DragTarget from '../../components/DragAndDrop/DragTarget.vue'

const CorrectnessValues = {
    FALSE: 0,
    TRUE: 1,
    NOT_ANSWERED: 2,
}

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
            correctness: {},
        }
    },
    methods: {
        //todo clean up this logic and look into having props generate draggables and targets, as well as the logic to handle them.
        handleRelease(e: DragReleaseEvent) {
            const acceptable = [
                'eighth-draggable,eighth-target',
                'quarter-draggable,quarter-target',
                'half-draggable,half-target',
                'whole-draggable,whole-target',
            ]
            if (e.dest == null) {
                this.correctness = CorrectnessValues.NOT_ANSWERED
                return
            }

            let len = e.dest.split('-')[0]
            if (acceptable.includes(e.source + ',' + e.dest)) {
                console.log('valid combo')
                this.correctness[len] = CorrectnessValues.TRUE
            } else {
                console.log('invalid combo')
                this.correctness[len] = CorrectnessValues.FALSE
            }
        },
    },
})
</script>

<template>
    <DragAndDrop @dragReleased="handleRelease">
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
                        isCorrect: correctness[len] == 1,
                        isIncorrect: correctness[len] == 0,
                    }"
                    class="correctnessIndicator"
                ></span>
                <span>
                    {{ len }}
                    <DragTarget :id="`${len}-target`"></DragTarget>
                </span>
            </span>
        </div>
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
