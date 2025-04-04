<script lang="ts">
import { defineComponent } from 'vue'
import { useDarkMode } from '../utils/darkMode'

export default defineComponent({
    name: 'ThemeToggle',
    setup() {
        return useDarkMode()
    },
    data() {
        return {
            darkSelected: null,
        }
    },
    methods: {
        toggleTheme() {
            if (this.darkSelected) {
                document.body.classList.add('dark-mode')
            } else {
                document.body.classList.remove('dark-mode')
            }
            localStorage.setItem('prefersDark', JSON.stringify(this.darkSelected))
        },
    },
    created() {
        this.darkSelected = localStorage.getItem('prefersDark')
        if (this.darkSelected === null) {
            this.darkSelected = this.isDarkMode
        } else {
            this.darkSelected = JSON.parse(this.darkSelected)
        }
        this.toggleTheme()
    },
})
</script>

<template>
    <div class="toggle flex-row">
        <i class="fa-solid fa-sun" style="margin-right: 0.6rem"></i>
        <input name="theme" type="checkbox" role="switch" v-model="darkSelected" @change="toggleTheme" />
        <i class="fa-solid fa-moon"></i>
    </div>
</template>

<style scoped lang="sass">
.toggle
    justify-content: space-between

[type='checkbox'][role='switch']:checked
    --pico-background-color: #05B6D1
    --pico-border-color: #05B6D1

[type='checkbox'][role='switch']
    --pico-background-color: #a6a8a8
    --pico-border-color: #a6a8a8
</style>
