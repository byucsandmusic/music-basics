import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import BasePage from './pages/BasePage.vue'
import HeIsBorn from './pages/exploration/HeIsBorn.vue'
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
import AsBreadIsBroken from './pages/exploration/AsBreadIsBroken.vue'
import FirstMatchTheSong from './pages/crashCourse/FirstMatchTheSong.vue'
import SecondMatchTheSong from './pages/crashCourse/SecondMatchTheSong.vue'

const U = '↗️'
const D = '↘️'
const N = '➡️'

const routes = [
    { path: '/:pathMatch(.*)*', component: NotFound },
    { path: '/', component: Home, alias: '/home' },
    {
        path: '/demo',
        component: BasePage,
        children: [
            { path: '', redirect: '/demo/explore' },
            {
                path: 'explore',
                component: HeIsBorn,
                props: { descriptionPath: ['module1', 'exploration', 'description'] },
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
                path: 'tap-along-easy',
                component: TapAlong,
                props: {
                    rhythm: {
                        meter: '4/4',
                        tempo: '100',
                        beat: '1/4',
                        treble: ['BBBB'],
                        instrument: 36,
                    },
                    titleKeys: ['demo', 'tapAlong', 'easyTitle'],
                    progressKeys: {
                        moduleName: 'demo',
                        id: 'tap-along-easy',
                    },
                    description: "Here's an easy rhythm to try:",
                },
            },
            {
                path: 'tap-along-hard',
                component: TapAlong,
                props: {
                    rhythm: {
                        meter: '4/4',
                        tempo: '100',
                        beat: '1/4',
                        treble: ['B3/2B/BB'],
                        instrument: 36,
                    },
                    titleKeys: ['demo', 'tapAlong', 'hardTitle'],
                    progressKeys: {
                        moduleName: 'demo',
                        id: 'tap-along-hard',
                    },
                    description: "Here's an hard rhythm to try:",
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
                        { type: 'image', value: ['chorus.png'] },
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
                        { type: 'image', value: ['mixedNotes.jpg'] },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'duration'],
                        },
                        {
                            type: 'music',
                            music: {
                                meter: '4/4',
                                beat: '1/4',
                                tempo: '95',
                                key: 'D',
                                treble: ['c4|c2c2|cccc|c/c/c/c/c/c/c/c/'],
                            },
                            displayMidiPlayer: true,
                        },
                        {
                            type: 'text',
                            value: ['module0', 'rhythmInfo', 'diagramInfo'],
                        },
                        {
                            type: 'image',
                            value: ['RhythmDiagram.png'],
                        },
                    ],
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
                        {
                            type: 'music',
                            music: {
                                title: 'I Am a Child of God',
                                meter: '4/4',
                                beat: '1/4',
                                tempo: '95',
                                key: 'D',
                                treble: ["FF/F/GA|F3A|D'3/2D'/C'B|A3"],
                                verses: [['I am a child of God, And he has sent me here,']],
                            },
                        },
                        {
                            type: 'text',
                            value: ['module0', 'pitchInfo', 'notesOnSameLineInfo'],
                        },
                        {
                            type: 'music',
                            music: {
                                meter: '4/4',
                                beat: '1/4',
                                key: 'D',
                                treble: [`"${N}"F"${N}"F/""F/`],
                                verses: [['I am a']],
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
                                key: 'D',
                                treble: [`"${U}"F/"${U}"G""A`],
                                verses: [['a Child of']],
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
                                key: 'D',
                                treble: [`"${N}"D'3/2"${D}"D'/"${D}"C'"${D}"B|""A3`],
                                verses: [['he has sent me here']],
                            },
                        },
                        {
                            type: 'text',
                            value: ['module0', 'pitchInfo', 'conclusion'],
                        },
                    ],
                },
            },
            { path: 'pitch-matching-tunes-common', component: FirstMatchTheSong },
            { path: 'pitch-matching-tunes-new', component: SecondMatchTheSong },
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
                            value: ['AsBreadIsBroken.png'],
                        },
                        {
                            type: 'text',
                            value: ['module0', 'melodyLineInfo', 'topLineInfo'],
                        },
                        { type: 'image', value: ['AsBreadIsBroken_Highlighted.png'] },
                        {
                            type: 'text',
                            value: ['module0', 'melodyLineInfo', 'melodyInfo'],
                        },
                    ],
                },
            },
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
                    music: songs.as_bread_is_broken,
                },
            },
            {
                path: 'exploration',
                component: AsBreadIsBroken,
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
            {
                path: 'welcome',
                component: Video,
            },
            {
                path: 'overview',
                component: Video,
                props: {
                    startTime: 5,
                    key: 'videoTwo',
                },
            },
            {
                path: 'doctrine',
                component: Video,
                props: {
                    startTime: 10,
                    key: 'videoThree',
                },
            },
            {
                path: 'sing-along',
                component: SingAlong,
                props: {
                    music: songs.i_am_a_child_of_god,
                },
            },
            {
                path: 'explore',
                component: HeIsBorn,
                props: { descriptionPath: ['module1', 'exploration', 'description'] },
            },
            { path: 'end', component: ModuleEnd, props: { module: 'module1' } },
        ],
    },
    {
        path: '/module2',
        component: BasePage,
        children: [
            { path: '', redirect: '/module2/rhythm-info' },
            {
                path: 'rhythm-info',
                component: TextImagesAndMusic,
                props: {
                    titleKeys: ['module2', 'rhythmInfo', 'title'],
                    content: [
                        {
                            type: 'text',
                            value: ['module2', 'rhythmInfo', 'basics'],
                        },
                        { type: 'image', value: ['measures.jpg'] },
                        {
                            type: 'text',
                            value: ['module2', 'rhythmInfo', 'measureInfo'],
                        },
                        { type: 'image', value: ['mixedNotes.jpg'] },
                        {
                            type: 'text',
                            value: ['module2', 'rhythmInfo', 'wholeNoteInfo'],
                        },
                        { type: 'image', value: ['wholeNote.webp'] },
                        {
                            type: 'text',
                            value: ['module2', 'rhythmInfo', 'halfNoteInfo'],
                        },
                        { type: 'image', value: ['halfNote.webp'] },
                        {
                            type: 'text',
                            value: ['module2', 'rhythmInfo', 'quarterNoteInfo'],
                        },
                        { type: 'image', value: ['quarterNote.webp'] },
                        {
                            type: 'text',
                            value: ['module2', 'rhythmInfo', 'eighthNoteInfo'],
                        },
                        { type: 'image', value: ['eighthNote.webp'] },
                        {
                            type: 'text',
                            value: ['module2', 'rhythmInfo', 'dottedNotesInfo'],
                        },
                        { type: 'image', value: ['dottedQuarterNote.jpg'] },
                    ],
                },
            },
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
                    titleKeys: ['module2', 'rhythmTapAlongQuarterNotes', 'title'],
                    descriptionKeys: ['module2', 'rhythmTapAlongQuarterNotes', 'description'],
                    progressKeys: {
                        moduleName: 'module2',
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
                    titleKeys: ['module2', 'rhythmTapAlongHalfNotes', 'title'],
                    descriptionKeys: ['module2', 'rhythmTapAlongHalfNotes', 'description'],
                    progressKeys: {
                        moduleName: 'module2',
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
                    titleKeys: ['module2', 'rhythmTapAlongEighthNotes', 'title'],
                    descriptionKeys: ['module2', 'rhythmTapAlongEighthNotes', 'description'],
                    progressKeys: {
                        moduleName: 'module2',
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
                    titleKeys: ['module2', 'rhythmTapAlongMixed1', 'title'],
                    descriptionKeys: ['module2', 'rhythmTapAlongMixed1', 'description'],
                    progressKeys: {
                        moduleName: 'module2',
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
                    titleKeys: ['module2', 'rhythmTapAlongMixed2', 'title'],
                    descriptionKeys: ['module2', 'rhythmTapAlongMixed2', 'description'],
                    progressKeys: {
                        moduleName: 'module2',
                        id: 'rhythm-tap-along-mixed-2',
                    },
                    description: 'Placeholder',
                },
            },
            { path: 'end', component: ModuleEnd, props: { module: 'module2' } },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
