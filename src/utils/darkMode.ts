import { onMounted, onUnmounted, ref } from 'vue'

/**
 * a composable to be used in the setup hook of a component if you need to
 * check the browser appearance mode outside of sass
 *
 * alternatively, in sass the media query:
 * `@media(prefers-color-scheme: dark)` may be used
 *
 * a usage example follows:
 *
 * <script lang='ts'>
 * export default defineComponent({
 *      name: 'example',
 *      setup() {
 *         const { isDarkMode } = useDarkMode()
 *         ...
 *         return { isDarkMode }
 *      },
 * })
 * </script>
 *
 * isDarkMode can be then accessed from the `this` object
 * anywhere in the component
 */
export const useDarkMode = () => {
    const isDarkMode = ref(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

    function update(event) {
        isDarkMode.value = event.matches
    }

    onMounted(() => window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', update))

    onUnmounted(() => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', update))

    return { isDarkMode }
}
