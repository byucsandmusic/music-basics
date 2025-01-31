<script lang="ts">
import Translator from '../models/translator'

export default {
    props: {
        translator: Translator,
    },
}
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
