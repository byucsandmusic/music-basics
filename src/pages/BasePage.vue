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
    },
})
</script>

<template>
    <div class="container">
        <div class="page-content">
            <RouterView #="{ Component }">
                <component
                    :is="Component"
                    :translator="translator"
                />
            </RouterView>
        </div>
        <Footer
            id="footer"
            :translator="translator"
        />
    </div>
</template>

<style scoped lang="sass">
.page-content
    margin-bottom: $footer-height + $top-bottom-margin
    > *
        margin-left: auto
        margin-right: auto
</style>
