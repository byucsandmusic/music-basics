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
            { path: 'intro', component: Video },
            { path: 'reading-verses-info', component: Video },
            {
                path: 'reading-verses-sing-along',
                component: SingAlong,
                props: { music: songs.i_am_a_child_of_god },
            },
            { path: 'rhythm-info', component: Video },
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
            { path: 'pitch-info', component: Video },
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
            { path: 'pitch-melody-line-info', component: Video },
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
