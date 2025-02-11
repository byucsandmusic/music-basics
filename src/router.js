import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Demo from './pages/demo/Demo.vue'
import Interactive from './pages/Interactive.vue'
import ModuleHome from './pages/ModuleHome.vue'
import SingAlong from './components/SingAlong.vue'
import NotFound from './pages/NotFound.vue'

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
                    music: {
                        title: 'I Am a Child of God',
                        meter: '4/4',
                        beat: '1/4',
                        tempo: '95',
                        key: 'C',
                        treble: [
                            'EE/E/FG|E3G|c3/c/BA|G3G|',
                            'GEEG|GFF3/E/|EDBA|G3z|',
                            'EGEG|GFDF|BBA3/A/|G3z|',
                            'EGEG|cAF3/D/|FFED|C3z|]',
                        ],
                        verses: [
                            [
                                'I am a child of God, And he has sent me here, Has',
                                'giv-en me an earth-ly home With par-ents kind and dear.',
                                'Lead me, guide me, walk be-side me, Help me find the way.',
                                'Teach me all that I must do To live with him some-day.',
                            ],
                        ],
                    },
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
