<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../../models/translator'

export default defineComponent({
    name: 'Demo',
    props: {
        translator: {
            type: Translator,
            required: true,
        },
    },
})
</script>

<template>
    <h1>{{ translator.get('demo', 'title') }}</h1>
    <RouterView #="{ Component }">
        <component
            :is="Component"
            :translator="translator"
        />
    </RouterView>
</template>

<style scoped></style>
