import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import BasePage from './pages/BasePage.vue'
import Exploration from './pages/basic/Exploration.vue'
import ModuleHome from './pages/ModuleHome.vue'
import SingAlong from './components/SingAlong.vue'
import NotFound from './pages/NotFound.vue'
import DragAndDropDemo from './pages/demo/DragAndDropDemo.vue'
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
        props: { translatorPath: 'demo/title' },
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
                        title: 'Mixed Rhythm',
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
                },
            },
            {
                path: 'drag-and-drop',
                component: DragAndDropDemo,
            },
        ],
    },
    {
        path: '/basics',
        component: BasePage,
        props: { translatorPath: 'basics/title' },
        children: [
            { path: '', redirect: '/basics/home' },
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
            { path: 'end', component: ModuleEnd, props: { module: 'basics' } },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
