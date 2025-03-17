<script lang="ts">
import Translator from './models/translator'
import { defineComponent } from 'vue'
import NavBar from './components/NavBar.vue'

export default defineComponent({
    name: 'App',
    setup() {
        return { translator: new Translator() }
    },
    components: {
        NavBar,
    },
    watch: {
        '$route.query.lang'(newLanguage: string) {
            if (newLanguage) {
                this.translator.setLanguage(newLanguage.toUpperCase())
            }
        },
    },
})
</script>

<template>
    <title>{{ translator.get('home', 'title') }}</title>
    <main>
        <NavBar :translator="translator" />
        <RouterView v-slot="{ Component }">
            <component :is="Component" :translator="translator" />
        </RouterView>
    </main>
</template>

<style scoped lang="sass"></style>
