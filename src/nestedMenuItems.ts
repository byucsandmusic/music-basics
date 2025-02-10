import Translator from './models/translator'

export default function useNestedMenuItems(translator: Translator) {
    return {
        demo: [
            {
                href: '/demo/home',
                title: translator.get('general', 'home'),
            },
            {
                href: '/demo/interact',
                title: translator.get('general', 'interactive', 'title'),
            },
            {
                href: '/demo/music-notation',
                title: translator.get('general', 'musicNotation', 'title'),
            },
        ],
    }
}
