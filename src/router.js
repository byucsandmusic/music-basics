import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import BasePage from './pages/BasePage.vue'
import Exploration from './pages/basic/Exploration.vue'
import ModuleHome from './pages/ModuleHome.vue'
import SingAlong from './components/SingAlong.vue'
import NotFound from './pages/NotFound.vue'
import DragAndDropDemo from './pages/demo/DragAndDropDemo.vue'
import MatchTheSong from './pages/demo/MatchTheSongDemo.vue'
import TapAlong from './components/TapAlong.vue'
import { songs } from './models/songs.ts'
import Video from './components/Video.vue'
import ModuleEnd from './pages/ModuleEnd.vue'
import TextAndImages from './components/TextAndImages.vue'

const routes = [
    { path: '/:pathMatch(.*)*', component: NotFound },
    { path: '/', component: Home, alias: '/home' },
    {
        path: '/demo',
        component: BasePage,
        children: [
            { path: '', redirect: '/demo/home' },
            { path: 'home', component: ModuleHome },
            { path: 'explore', component: Exploration },
            {
                path: 'sing-along',
                component: SingAlong,
                props: {
                    title: ['general', 'singAlong', 'title'],
                    description: ['general', 'singAlong', 'description'],
                    music: songs.i_am_a_child_of_god,
                },
            },
            {
                path: 'tap-along',
                component: TapAlong,
                props: {
                    rhythm: {
                        meter: '4/4',
                        tempo: '100',
                        beat: '1/4',
                        treble: ['BB/B/BB'],
                        instrument: 36,
                    },
                    progressKeys: {
                        moduleName: 'demo',
                        id: 'tap-along',
                    },
                    description: "Here's a mixed rhythm to try:",
                },
            },
            {
                path: 'drag-and-drop',
                component: DragAndDropDemo,
            },
            {
                path: 'match-the-song',
                component: MatchTheSong,
            },
        ],
    },
    {
        path: '/module0',
        component: BasePage,
        children: [
            { path: '', redirect: '/module0/intro' },
            {
                path: 'intro',
                component: TextAndImages,
                props: {
                    titleKeys: ['module0', 'intro', 'title'],
                    content: [
                        {
                            type: 'image',
                            value: ['CongregationSinging.jpeg'],
                        },
                        {
                            type: 'text',
                            value: ['module0', 'intro', 'quote'],
                        },
                        {
                            type: 'text',
                            value: ['module0', 'intro', 'introParagraph'],
                        },
                    ],
                },
            },
            {
                path: 'reading-verses-info',
                component: TextAndImages,
                props: {
                    titleKeys: ['module0', 'readingVersesInfo', 'title'],
                    content: [
                        {
                            type: 'text',
                            value: [
                                'module0',
                                'readingVersesInfo',
                                'verseInfo',
                            ],
                        },
                        { type: 'image', value: ['Verse1.jpeg'] },
                        {
                            type: 'text',
                            value: [
                                'module0',
                                'readingVersesInfo',
                                'chorusInfo',
                            ],
                        },
                        { type: 'image', value: ['Chorus.jpeg'] },
                        {
                            type: 'text',
                            value: [
                                'module0',
                                'readingVersesInfo',
                                'nextVerseInfo',
                            ],
                        },
                        { type: 'image', value: ['Verse2.jpeg'] },
                    ],
                },
            },
            {
                path: 'reading-verses-sing-along',
                component: SingAlong,
                props: { music: songs.i_am_a_child_of_god },
            },
            {
                path: 'rhythm-info',
                component: TextAndImages,
                props: {
                    titleKeys: ['module0', 'rhythmInfo', 'title'],
                    content: [
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'basics'],
                        },
                        { type: 'image', value: ['RhythmBasics.png'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'measureInfo'],
                        },
                        { type: 'image', value: ['RhythmMeasure.png'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'wholeNoteInfo'],
                        },
                        { type: 'image', value: ['RhythmWholeNote.png'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'halfNoteInfo'],
                        },
                        { type: 'image', value: ['RhythmHalfNote.png'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'quarterNoteInfo'],
                        },
                        { type: 'image', value: ['RhythmQuarterNote.png'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'eighthNoteInfo'],
                        },
                        { type: 'image', value: ['RhythmEighthNote.png'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'dottedNotesInfo'],
                        },
                        { type: 'image', value: ['RhythmDottedNotes.png'] },
                    ],
                },
            },
            // { path: 'rhythm-matching-names', component: DragAndDrop },
            // { path: 'rhythm-matching-timing', component: DragAndDrop },
            {
                path: 'rhythm-tap-along-quarter-notes',
                component: TapAlong,
                props: {
                    rhythm: {
                        meter: '4/4',
                        tempo: '100',
                        beat: '1/4',
                        treble: ['BBBB'],
                        instrument: 36,
                    },
                    titleKeys: [
                        'module0',
                        'rhythmTapAlongQuarterNotes',
                        'title',
                    ],
                    progressKeys: {
                        moduleName: 'module0',
                        id: 'rhythm-tap-along-quarter-notes',
                    },
                    description: 'Placeholder',
                },
            },
            {
                path: 'rhythm-tap-along-half-notes',
                component: TapAlong,
                props: {
                    rhythm: {
                        meter: '4/4',
                        tempo: '100',
                        beat: '1/4',
                        treble: ['B2B2'],
                        instrument: 36,
                    },
                    titleKeys: ['module0', 'rhythmTapAlongHalfNotes', 'title'],
                    progressKeys: {
                        moduleName: 'module0',
                        id: 'rhythm-tap-along-half-notes',
                    },
                    description: 'Placeholder',
                },
            },
            {
                path: 'rhythm-tap-along-8th-notes',
                component: TapAlong,
                props: {
                    rhythm: {
                        meter: '4/4',
                        tempo: '100',
                        beat: '1/4',
                        treble: ['B/B/B/B/B/B/B/B/'],
                        instrument: 36,
                    },
                    titleKeys: [
                        'module0',
                        'rhythmTapAlongEighthNotes',
                        'title',
                    ],
                    progressKeys: {
                        moduleName: 'module0',
                        id: 'rhythm-tap-along-8th-notes',
                    },
                    description: 'Placeholder',
                },
            },
            {
                path: 'rhythm-tap-along-mixed-1',
                component: TapAlong,
                props: {
                    rhythm: {
                        meter: '4/4',
                        tempo: '100',
                        beat: '1/4',
                        treble: ['BB/B/BB'],
                        instrument: 36,
                    },
                    titleKeys: ['module0', 'rhythmTapAlongMixed1', 'title'],
                    progressKeys: {
                        moduleName: 'module0',
                        id: 'rhythm-tap-along-mixed-1',
                    },
                    description: 'Placeholder',
                },
            },
            {
                path: 'rhythm-tap-along-mixed-2',
                component: TapAlong,
                props: {
                    rhythm: {
                        meter: '4/4',
                        tempo: '100',
                        beat: '1/4',
                        treble: ['BBB3/B/'],
                        instrument: 36,
                    },
                    titleKeys: ['module0', 'rhythmTapAlongMixed2', 'title'],
                    progressKeys: {
                        moduleName: 'module0',
                        id: 'rhythm-tap-along-mixed-2',
                    },
                    description: 'Placeholder',
                },
            },
            {
                path: 'rhythm-sing-along-common',
                component: SingAlong,
                props: {
                    music: songs.i_am_a_child_of_god,
                },
            },
            {
                path: 'rhythm-sing-along-new',
                component: SingAlong,
                props: {
                    music: songs.i_am_a_child_of_god,
                },
            },
            {
                path: 'pitch-info',
                component: TextAndImages,
                props: {
                    titleKeys: ['module0', 'pitchInfo', 'title'],
                    content: [
                        {
                            type: 'text',
                            value: ['module0', 'pitchInfo', 'basics'],
                        },
                        { type: 'image', value: ['PitchBasics.png'] },
                        {
                            type: 'text',
                            value: [
                                'module0',
                                'pitchInfo',
                                'notesOnSameLineInfo',
                            ],
                        },
                        { type: 'image', value: ['notesOnSameLine.png'] },
                        {
                            type: 'text',
                            value: [
                                'module0',
                                'pitchInfo',
                                'ascendingNotesInfo',
                            ],
                        },
                        { type: 'image', value: ['AscendingNotes.png'] },
                        {
                            type: 'text',
                            value: [
                                'module0',
                                'pitchInfo',
                                'descendingNotesInfo',
                            ],
                        },
                        { type: 'image', value: ['DescendingNotes.png'] },
                        {
                            type: 'text',
                            value: ['module0', 'pitchInfo', 'conlcusion'],
                        },
                    ],
                },
            },
            // { path: 'pitch-matching-tunes-common', component: DragAndDrop },
            // { path: 'pitch-matching-tunes-new', component: DragAndDrop },
            {
                path: 'pitch-sing-along-common',
                component: SingAlong,
                props: {
                    music: songs.i_am_a_child_of_god,
                },
            },
            {
                path: 'pitch-sing-along-new',
                component: SingAlong,
                props: {
                    music: songs.i_am_a_child_of_god,
                },
            },
            {
                path: 'pitch-melody-line-info',
                component: TextAndImages,
                props: {
                    titleKeys: ['module0', 'melodyLineInfo', 'title'],
                    content: [
                        {
                            type: 'text',
                            value: [
                                'module0',
                                'melodyLineInfo',
                                'lastThingText',
                            ],
                        },
                        {
                            type: 'image',
                            value: ['HeIsBornTheDivineChristChild.jpeg'],
                        },
                        {
                            type: 'text',
                            value: ['module0', 'melodyLineInfo', 'topLineInfo'],
                        },
                        { type: 'image', value: ['TopLine.png'] },
                        {
                            type: 'text',
                            value: ['module0', 'melodyLineInfo', 'melodyInfo'],
                        },
                    ],
                },
            },
            { path: 'exploration', component: Exploration },
            {
                path: 'end',
                component: ModuleEnd,
                props: { module: 'module0' },
            },
        ],
    },
    {
        path: '/module1',
        component: BasePage,
        children: [
            { path: '', redirect: '/module1/home' },
            { path: 'home', component: ModuleHome },
            { path: 'welcome', component: Video },
            { path: 'overview', component: Video },
            { path: 'doctrine', component: Video },
            {
                path: 'sing-along',
                component: SingAlong,
                props: {
                    music: songs.i_am_a_child_of_god,
                },
            },
            { path: 'explore', component: Exploration },
            { path: 'end', component: ModuleEnd, props: { module: 'module1' } },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
