<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../models/translator'

export default defineComponent({
    name: 'Interactive',
    props: {
        translator: {
            type: Translator,
            required: true,
        },
    },
})
</script>

<template>
    <img
        alt=""
        src="../assets/hymns/HeIsBornTheChristChild.png"
    />
</template>

<style scoped></style>
