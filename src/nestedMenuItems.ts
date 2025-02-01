import Translator from './models/translator.ts'

export default function useNestedMenuItems(translator: Translator) {
    return {
        dummy: [
            {
                id: 1,
                href: '/dummy/home',
                title: translator.get('general', 'home'),
            },
            {
                id: 2,
                href: '/dummy/interact',
                title: translator.get('general', 'interactive', 'title'),
            },
        ],
    }
}
