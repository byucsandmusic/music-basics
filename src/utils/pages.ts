import Translator from '../models/translator'
import { LinkItem } from '../models/types'

export default function usePages(translator: Translator): Record<string, LinkItem[]> {
    return {
        module0: [
            {
                id: '/module0/intro',
                href: '/module0/intro',
                title: translator.get('module0', 'intro', 'title'),
            },
            {
                id: '/module0/reading-verses-info',
                href: '/module0/reading-verses-info',
                title: translator.get('module0', 'readingVersesInfo', 'title'),
            },
            {
                id: '/module0/reading-verses-sing-along',
                href: '/module0/reading-verses-sing-along',
                title: translator.get('module0', 'readingVersesSingAlong', 'title'),
                notInMenu: true,
            },
            {
                id: '/module0/rhythm-info',
                href: '/module0/rhythm-info',
                title: translator.get('module0', 'rhythmInfo', 'title'),
            },
            // {
            //     id: '/module0/rhythm-matching-names',
            //     href: '/module0/rhythm-matching-names',
            //     title: translator.get(
            //         'module0',
            //         'rhythmMatchingNames',
            //         'title'
            //     ),
            //     notInMenu: true,
            // },
            // {
            //     id: '/module0/rhythm-matching-timing',
            //     href: '/module0/rhythm-matching-timing',
            //     title: translator.get(
            //         'module0',
            //         'rhythmMatchingTiming',
            //         'title'
            //     ),
            //     notInMenu: true,
            // },
            {
                id: '/module0/rhythm-tap-along-quarter-notes',
                href: '/module0/rhythm-tap-along-quarter-notes',
                title: translator.get('module0', 'rhythmTapAlongQuarterNotes', 'title'),
                notInMenu: true,
            },
            {
                id: '/module0/rhythm-tap-along-half-notes',
                href: '/module0/rhythm-tap-along-half-notes',
                title: translator.get('module0', 'rhythmTapAlongHalfNotes', 'title'),
                notInMenu: true,
            },
            {
                id: '/module0/rhythm-tap-along-8th-notes',
                href: '/module0/rhythm-tap-along-8th-notes',
                title: translator.get('module0', 'rhythmTapAlong8thNotes', 'title'),
                notInMenu: true,
            },
            {
                id: '/module0/rhythm-tap-along-mixed-1',
                href: '/module0/rhythm-tap-along-mixed-1',
                title: translator.get('module0', 'rhythmTapAlongMixed1', 'title'),
                notInMenu: true,
            },
            {
                id: '/module0/rhythm-tap-along-mixed-2',
                href: '/module0/rhythm-tap-along-mixed-2',
                title: translator.get('module0', 'rhythmTapAlongMixed2', 'title'),
                notInMenu: true,
            },
            {
                id: '/module0/rhythm-sing-along-common',
                href: '/module0/rhythm-sing-along-common',
                title: translator.get('module0', 'rhythmSingAlongCommon', 'title'),
                notInMenu: true,
            },
            {
                id: '/module0/rhythm-sing-along-new',
                href: '/module0/rhythm-sing-along-new',
                title: translator.get('module0', 'rhythmSingAlongNew', 'title'),
                notInMenu: true,
            },
            {
                id: '/module0/pitch-info',
                href: '/module0/pitch-info',
                title: translator.get('module0', 'pitchInfo', 'title'),
            },
            // {
            //     id: '/module0/pitch-matching-tunes-common',
            //     href: '/module0/pitch-matching-tunes-common',
            //     title: translator.get(
            //         'module0',
            //         'pitchMatchingTunesCommon',
            //         'title'
            //     ),
            //     notInMenu: true,
            // },
            // {
            //     id: '/module0/pitch-matching-tunes-new',
            //     href: '/module0/pitch-matching-tunes-new',
            //     title: translator.get(
            //         'module0',
            //         'pitchMatchingTunesNew',
            //         'title'
            //     ),
            //     notInMenu: true,
            // },
            {
                id: '/module0/pitch-sing-along-common',
                href: '/module0/pitch-sing-along-common',
                title: translator.get('module0', 'pitchSingAlongCommon', 'title'),
                notInMenu: true,
            },
            {
                id: '/module0/pitch-sing-along-new',
                href: '/module0/pitch-sing-along-new',
                title: translator.get('module0', 'pitchSingAlongNew', 'title'),
                notInMenu: true,
            },
            {
                id: '/module0/pitch-melody-line-info',
                href: '/module0/pitch-melody-line-info',
                title: translator.get('module0', 'pitchMelodyLineInfo', 'title'),
                notInMenu: true,
            },
            {
                id: '/module0/exploration',
                href: '/module0/exploration',
                title: translator.get('module0', 'exploration', 'title'),
            },
            {
                id: 'end',
                href: '/module0/end',
                notInMenu: true,
            },
        ],
        module1: [
            {
                id: '/module1/home',
                href: '/module1/home',
                title: translator.get('general', 'home'),
            },
            {
                id: '/module1/welcome',
                href: '/module1/welcome',
                title: translator.get('module1', 'welcome', 'title'),
            },
            {
                id: '/module1/overview',
                href: '/module1/overview',
                title: translator.get('module1', 'overview', 'title'),
            },
            {
                id: '/module1/doctrine',
                href: '/module1/doctrine',
                title: translator.get('module1', 'doctrine', 'title'),
            },
            {
                id: '/module1/sing-along',
                href: '/module1/sing-along',
                title: translator.get('general', 'singAlong', 'title'),
            },
            {
                id: '/module1/explore',
                href: '/module1/explore',
                title: translator.get('module1', 'explore', 'title'),
            },
            {
                id: 'end',
                href: '/module1/end',
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
                title: translator.get('module1', 'explore', 'title'),
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
            {
                id: '/demo/match-the-song',
                href: '/demo/match-the-song',
                title: translator.get('general', 'matchTheSong', 'title'),
            },
        ],
    }
}
