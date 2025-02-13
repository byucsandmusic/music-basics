import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Demo from './pages/demo/Demo.vue'
import Interactive from './pages/Interactive.vue'
import ModuleHome from './pages/ModuleHome.vue'
import SingAlong from './components/SingAlong.vue'
import NotFound from './pages/NotFound.vue'

import { songs } from './models/songs.ts'

const routes = [
    { path: '/:pathMatch(.*)*', component: NotFound },
    { path: '/', component: Home, alias: '/home' },
    {
        path: '/demo',
        component: Demo,
        children: [
            { path: '', redirect: '/demo/home' },
            { path: 'home', component: ModuleHome },
            {
                path: 'interact',
                component: Interactive,
            },
            {
                path: 'sing-along',
                component: SingAlong,
                props: {
                    music: songs.i_am_a_child_of_god,
                },
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
