<script lang="ts">
import { defineComponent } from 'vue'
import RouterDropdown from './RouterMenu.vue'
import Translator from '../models/translator'
import usePages from '../utils/pages'
import ThemeToggle from './ThemeToggle.vue'

export default defineComponent({
    name: 'NavBar',
    components: { ThemeToggle, RouterDropdown },
    props: {
        translator: {
            type: Translator,
            required: true,
        },
    },
    setup({ translator }) {
        return { nestedMenuItems: usePages(translator) }
    },
})
</script>

<template>
    <nav class="navBar flex-row" id="nav-bar">
        <ul class="nav-items">
            <li class="logo-container flex-row">
                <RouterLink to="/">
                    <img
                        class="logo"
                        role="presentation"
                        src="https://www.churchofjesuschrist.org/imgs/c730fd12d24c640f7649912008ddf828afd93403/full/60%2C/0/default.png"
                        alt="home button"
                    />
                </RouterLink>
            </li>
            <li>
                <RouterDropdown :links="nestedMenuItems.module0" :title="translator.get('module0', 'title')" />
            </li>
            <li>
                <RouterDropdown :links="nestedMenuItems.module1" :title="translator.get('module1', 'title')" />
            </li>
            <li>
                <RouterLink to="/">{{ translator.get('module2', 'title') }}</RouterLink>
            </li>
            <li>
                <RouterLink to="/">{{ translator.get('module3', 'title') }}</RouterLink>
            </li>
            <li>
                <RouterDropdown :links="nestedMenuItems.demo" :title="translator.get('demo', 'title')" />
            </li>
        </ul>
        <ThemeToggle />
    </nav>
</template>

<style scoped lang="sass">
.navBar
    height: $footer-height
    background: $secondary-background
    --pico-nav-link-spacing-vertical: 0.3rem
    --pico-nav-element-spacing-vertical: 0.3rem
    margin-bottom: $top-bottom-margin
    justify-content: space-between
    align-items: baseline
    padding-left: 0.3rem
    padding-right: 1rem

.nav-items
    height: 100%

.logo
    height: 2.5rem

.logo-container
    background: $accent-color
    height: $footer-height
    min-width: 3.5rem
    padding: 0
    justify-content: center
    align-items: center

.dark-mode
    .logo-container
        background: $accent-color-dark
    .navBar
        background: $secondary-background-dark
</style>
