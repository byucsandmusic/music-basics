<script lang="ts">
import { RouterView } from 'vue-router'
import Home from './pages/Home.vue'
import Translator from './models/translator'
import RouterMenu from './components/RouterMenu.vue'
import useNestedMenuItems from './nestedMenuItems'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    setup() {
        const translator = new Translator()
        const nestedMenuItems = useNestedMenuItems(translator)

        return { translator, nestedMenuItems }
    },
    components: {
        RouterDropdown: RouterMenu,
        HomePage: Home,
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
    <main class="container">
        <nav class="grid">
            <ul>
                <li>
                    <RouterLink to="/">{{
                        translator.get('general', 'home')
                    }}</RouterLink>
                </li>
                <li>
                    <RouterLink to="/">{{
                        translator.get('module1', 'title')
                    }}</RouterLink>
                </li>
                <li>
                    <RouterLink to="/">{{
                        translator.get('module2', 'title')
                    }}</RouterLink>
                </li>
                <li>
                    <RouterLink to="/">{{
                        translator.get('module3', 'title')
                    }}</RouterLink>
                </li>
                <li>
                    <RouterDropdown
                        :links="nestedMenuItems.dummy"
                        :title="translator.get('dummy', 'title')"
                    />
                </li>
            </ul>
        </nav>
        <RouterView v-slot="{ Component }">
            <component
                :is="Component"
                :translator="translator"
            />
        </RouterView>
    </main>
</template>

<style scoped></style>
