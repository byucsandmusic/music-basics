import usePages from './pages'
import { useRoute } from 'vue-router'
import Translator from '../models/translator'
import { ref, watch } from 'vue'

export const useCurrentPage = (translator: Translator) => {
    const menuItems = usePages(translator)
    const route = useRoute()

    const module = ref(route.path.split('/')[1])
    const updateModule = (path: string) => (module.value = path.split('/')[1])

    const pageIndex = ref(menuItems[module.value]?.findIndex(({ href }) => href === route.path))
    const updateIndex = () => (pageIndex.value = menuItems[module.value]?.findIndex(({ href }) => href === route.path))

    watch(
        () => route.path,
        (path) => {
            updateModule(path)
            updateIndex()
        }
    )

    return { module, pageIndex, menuItems }
}
