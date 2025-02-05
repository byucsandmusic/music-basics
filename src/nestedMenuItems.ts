import Translator from './models/translator'

export default function useNestedMenuItems(translator: Translator) {
    return {
        demo: [
            {
                id: 1,
                href: '/demo/home',
                title: translator.get('general', 'home'),
            },
            {
                id: 2,
                href: '/demo/interact',
                title: translator.get('general', 'interactive', 'title'),
            },
            {
                id: 3,
                href: '/demo/music-notation',
                title: translator.get('general', 'musicNotation', 'title'),
            },
        ],
    }
}
