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
import TextImagesAndMusic from './components/TextImagesAndMusic.vue'

const routes = [
    { path: '/:pathMatch(.*)*', component: NotFound },
    { path: '/', component: Home, alias: '/home' },
    {
        path: '/demo',
        component: BasePage,
        children: [
            { path: '', redirect: '/demo/home' },
            { path: 'home', component: ModuleHome },
            {
                path: 'explore',
                component: Exploration,
                props: { descriptionPath: ['module0', 'exploration', 'description'] },
            },
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
                    titleKeys: ['demo', 'tapAlong', 'title'],
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
                component: TextImagesAndMusic,
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
                component: TextImagesAndMusic,
                props: {
                    titleKeys: ['module0', 'readingVersesInfo', 'title'],
                    content: [
                        {
                            type: 'text',
                            value: ['module0', 'readingVersesInfo', 'verseInfo'],
                        },
                        { type: 'image', value: ['verse1.jpg'] },
                        {
                            type: 'text',
                            value: ['module0', 'readingVersesInfo', 'chorusInfo'],
                        },
                        { type: 'image', value: ['chorus.jpg'] },
                        {
                            type: 'text',
                            value: ['module0', 'readingVersesInfo', 'nextVerseInfo'],
                        },
                        { type: 'image', value: ['verse2.jpg'] },
                    ],
                },
            },
            {
                path: 'reading-verses-sing-along',
                component: SingAlong,
                props: {
                    title: ['module0', 'readingVersesSingAlong', 'title'],
                    description: ['module0', 'readingVersesSingAlong', 'description'],
                    music: songs.i_am_a_child_of_god,
                },
            },
            {
                path: 'rhythm-info',
                component: TextImagesAndMusic,
                props: {
                    titleKeys: ['module0', 'rhythmInfo', 'title'],
                    content: [
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'basics'],
                        },
                        { type: 'image', value: ['measures.jpg'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'measureInfo'],
                        },
                        { type: 'image', value: ['mixedNotes.jpg'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'wholeNoteInfo'],
                        },
                        { type: 'image', value: ['wholeNote.webp'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'halfNoteInfo'],
                        },
                        { type: 'image', value: ['halfNote.webp'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'quarterNoteInfo'],
                        },
                        { type: 'image', value: ['quarterNote.webp'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'eighthNoteInfo'],
                        },
                        { type: 'image', value: ['eighthNote.webp'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'dottedNotesInfo'],
                        },
                        { type: 'image', value: ['dottedQuarterNote.jpg'] },
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
                    titleKeys: ['module0', 'rhythmTapAlongQuarterNotes', 'title'],
                    descriptionKeys: ['module0', 'rhythmTapAlongQuarterNotes', 'description'],
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
                    descriptionKeys: ['module0', 'rhythmTapAlongHalfNotes', 'description'],
                    progressKeys: {
                        moduleName: 'module0',
                        id: 'rhythm-tap-along-half-notes',
                    },
                    description: 'Placeholder',
                },
            },
            {
                path: 'rhythm-tap-along-eighth-notes',
                component: TapAlong,
                props: {
                    rhythm: {
                        meter: '4/4',
                        tempo: '100',
                        beat: '1/4',
                        treble: ['B/B/B/B/B/B/B/B/'],
                        instrument: 36,
                    },
                    titleKeys: ['module0', 'rhythmTapAlongEighthNotes', 'title'],
                    descriptionKeys: ['module0', 'rhythmTapAlongEighthNotes', 'description'],
                    progressKeys: {
                        moduleName: 'module0',
                        id: 'rhythm-tap-along-eighth-notes',
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
                    descriptionKeys: ['module0', 'rhythmTapAlongMixed1', 'description'],
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
                    descriptionKeys: ['module0', 'rhythmTapAlongMixed2', 'description'],
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
                    title: ['module0', 'rhythmSingAlongCommon', 'title'],
                    description: ['module0', 'rhythmSingAlongCommon', 'description'],
                    music: songs.i_am_a_child_of_god,
                },
            },
            {
                path: 'rhythm-sing-along-new',
                component: SingAlong,
                props: {
                    title: ['module0', 'rhythmSingAlongNew', 'title'],
                    description: ['module0', 'rhythmSingAlongNew', 'description'],
                    music: songs.i_am_a_child_of_god,
                },
            },
            {
                path: 'pitch-info',
                component: TextImagesAndMusic,
                props: {
                    titleKeys: ['module0', 'pitchInfo', 'title'],
                    content: [
                        {
                            type: 'text',
                            value: ['module0', 'pitchInfo', 'basics'],
                        },
                        { type: 'image', value: ['lineOfMusic.jpg'] },
                        {
                            type: 'text',
                            value: ['module0', 'pitchInfo', 'notesOnSameLineInfo'],
                        },
                        {
                            type: 'music',
                            music: {
                                meter: '4/4',
                                beat: '1/4',
                                treble: ['FFFF'],
                            },
                        },
                        {
                            type: 'text',
                            value: ['module0', 'pitchInfo', 'ascendingNotesInfo'],
                        },
                        {
                            type: 'music',
                            music: {
                                meter: '4/4',
                                beat: '1/4',
                                treble: ['FGAB'],
                            },
                        },
                        {
                            type: 'text',
                            value: ['module0', 'pitchInfo', 'descendingNotesInfo'],
                        },
                        {
                            type: 'music',
                            music: {
                                meter: '4/4',
                                beat: '1/4',
                                treble: ['BAGF'],
                            },
                        },
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
                    title: ['module0', 'pitchSingAlongCommon', 'title'],
                    description: ['module0', 'pitchSingAlongCommon', 'description'],
                    music: songs.i_am_a_child_of_god,
                },
            },
            {
                path: 'pitch-sing-along-new',
                component: SingAlong,
                props: {
                    title: ['module0', 'pitchSingAlongNew', 'title'],
                    description: ['module0', 'pitchSingAlongNew', 'description'],
                    music: songs.i_am_a_child_of_god,
                },
            },
            {
                path: 'pitch-melody-line-info',
                component: TextImagesAndMusic,
                props: {
                    titleKeys: ['module0', 'melodyLineInfo', 'title'],
                    content: [
                        {
                            type: 'text',
                            value: ['module0', 'melodyLineInfo', 'lastThingText'],
                        },
                        {
                            type: 'image',
                            value: ['HeIsBornTheDivineChristChild.jpeg'],
                        },
                        {
                            type: 'text',
                            value: ['module0', 'melodyLineInfo', 'topLineInfo'],
                        },
                        { type: 'image', value: ['HeIsBornTheDivineChristChildHighlighted.jpg'] },
                        {
                            type: 'text',
                            value: ['module0', 'melodyLineInfo', 'melodyInfo'],
                        },
                    ],
                },
            },
            {
                path: 'exploration',
                component: Exploration,
                props: { descriptionPath: ['module0', 'exploration', 'description'] },
            },
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
            {
                path: 'explore',
                component: Exploration,
                props: { descriptionPath: ['module0', 'exploration', 'description'] },
            },
            { path: 'end', component: ModuleEnd, props: { module: 'module1' } },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
