import {createRouter, createWebHistory} from 'vue-router'

import HomePage from './components/HomePage.vue'
import DummyModule from './components/DummyModule.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/dummy', component: DummyModule },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router