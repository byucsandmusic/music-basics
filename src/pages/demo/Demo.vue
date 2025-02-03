<script lang="ts">
import Translator from '../../models/translator'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Demo',
    props: {
        translator: Translator,
    },
})
</script>

<template>
    <h1>{{ translator.get('dummy', 'title') }}</h1>
    <RouterView #="{ Component }">
        <component
            :is="Component"
            :translator="translator"
        />
    </RouterView>
</template>

<style scoped></style>
