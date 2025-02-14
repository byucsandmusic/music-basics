<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Translator from '../../models/translator'
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop.vue'
import Draggable from '../../components/DragAndDrop/Draggable.vue'
import DragTarget from '../../components/DragAndDrop/DragTarget.vue'

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
})
</script>

<template>
    <DragAndDrop>
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
            <span>
                Eighth
                <DragTarget id="eighth-target"></DragTarget>
            </span>
            <span>
                Quarter
                <DragTarget id="quarter-target"></DragTarget>
            </span>
            <span>
                Half
                <DragTarget id="half-target"></DragTarget>
            </span>
            <span>
                Whole
                <DragTarget id="whole-target"></DragTarget>
            </span>
        </div>
    </DragAndDrop>
</template>

<style lang="sass" scoped>
div
    display: flex
    flex-flow: row wrap
</style>
