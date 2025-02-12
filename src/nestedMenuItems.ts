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
                id: '/demo/music-notation',
                href: '/demo/music-notation',
                title: translator.get('general', 'musicNotation', 'title'),
            },
        ],
    }
}
