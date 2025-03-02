import Translator from './models/translator'

export default function useNestedMenuItems(translator: Translator) {
    return {
        basics: [
            {
                id: '/basics/home',
                href: '/basics/home',
                title: translator.get('general', 'home'),
            },
            {
                id: '/basics/welcome',
                href: '/basics/welcome',
                title: translator.get('basics', 'welcome', 'title'),
            },
            {
                id: '/basics/overview',
                href: '/basics/overview',
                title: translator.get('basics', 'overview', 'title'),
            },
            {
                id: '/basics/doctrine',
                href: '/basics/doctrine',
                title: translator.get('basics', 'doctrine', 'title'),
            },
            {
                id: '/basics/sing-along',
                href: '/basics/sing-along',
                title: translator.get('general', 'singAlong', 'title'),
            },
            {
                id: '/basics/explore',
                href: '/basics/explore',
                title: translator.get('basics', 'explore', 'title'),
            },
            {
                id: 'end',
                href: '/basics/end',
                notInMenu: true,
            },
        ],
        demo: [
            {
                id: '/demo/home',
                href: '/demo/home',
                title: translator.get('general', 'home'),
            },
            {
                id: '/demo/explore',
                href: '/demo/explore',
                title: translator.get('basics', 'explore', 'title'),
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
                id: '/demo/drag-and-drop',
                href: '/demo/drag-and-drop',
                title: translator.get('general', 'dragAndDrop', 'title'),
            },
        ],
    }
}
