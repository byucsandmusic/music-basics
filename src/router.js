import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './components/HomePage.vue'
import DummyModule from './components/DummyModule.vue'
import InteractivePage from './components/InteractivePage.vue'
import ModuleHome from './components/ModuleHome.vue'

const routes = [
    { path: '/', component: HomePage, alias: '/home' },
    {
        path: '/dummy',
        component: DummyModule,
        children: [
            { path: 'home', component: ModuleHome },
            {
                path: 'interact',
                component: InteractivePage,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
