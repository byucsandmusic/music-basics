import { languages } from './models/languages'
import Translator from './models/translator'

export default function useNestedMenuItems(translator: Translator) {
    return {
        demo: [
            {
                id: '/demo/home',
                href: '/demo/home',
                title: translator.get('general', 'home'),
            },
            {
                id: '/demo/interact',
                href: '/demo/interact',
                title: translator.get('general', 'interactive', 'title'),
            },
            {
                id: '/demo/sing-along',
                href: '/demo/sing-along',
                title: translator.get('general', 'singAlong', 'title'),
            },
            {
                id: '/demo/tap-along',
                href: '/demo/tap-along',
                title: translator.get('general', 'tapAlong', 'title'),
            },
            {
                id: 4,
                href: '/demo/drag-and-drop',
                title: translator.get('general', 'dragAndDrop', 'title'),
            },
        ],
    }
}
