<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../../models/translator'
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop.vue'

export default defineComponent({
    name: 'DragAndDropDemo',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    components: {
        DragAndDrop,
    },
})
</script>

<template>
    <span
        class="dragTarget"
        :id="id"
    ></span>
</template>

<style lang="sass" scoped></style>
