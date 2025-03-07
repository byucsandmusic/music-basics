<script lang="ts">
import { defineComponent } from 'vue'
import Translator from '../models/translator'
import Footer from '../components/Footer.vue'

export default defineComponent({
    name: 'BasePage',
    components: { Footer },
    props: {
        translator: {
            type: Translator,
            required: true,
        },
        translatorPath: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            footerHeight: '4.4rem',
        }
    },
})
</script>

<template>
    <div>
        <h1>{{ translator.get(...translatorPath.split('/')) }}</h1>
        <div class="page-content">
            <RouterView #="{ Component }">
                <component
                    :is="Component"
                    :translator="translator"
                />
            </RouterView>
        </div>
        <Footer
            :translator="translator"
            :footerHeight="footerHeight"
        />
    </div>
</template>

<style scoped lang="sass">
.page-content
    margin-bottom: $button-bar-height
    > *
        margin-left: auto
        margin-right: auto
</style>
