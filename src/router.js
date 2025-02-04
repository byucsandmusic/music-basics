import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Demo from './pages/demo/Demo.vue'
import Interactive from './pages/Interactive.vue'
import ModuleHome from './pages/ModuleHome.vue'

const routes = [
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
        ],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
