<script lang="ts">
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
        <nav class="navBar">
            <img
                class="logo"
                role="presentation"
                src="https://www.churchofjesuschrist.org/imgs/c730fd12d24c640f7649912008ddf828afd93403/full/60%2C/0/default.png"
            />
            <ul>
                <li>
                    <RouterLink to="/">{{
                        translator.get('general', 'home')
                    }}</RouterLink>
                </li>
                <li>
                    <RouterDropdown
                        :links="nestedMenuItems.basics"
                        :title="translator.get('basics', 'title')"
                    />
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
                        :links="nestedMenuItems.demo"
                        :title="translator.get('demo', 'title')"
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

<style scoped lang="sass">
.navBar
    display: flex
    flex-flow: row nowrap
    justify-content: flex-start

.logo
    height: 3em
    margin: 1em
    margin-left: 0
</style>
