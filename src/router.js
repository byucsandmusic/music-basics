import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from './components/HomePage.vue'
import DummyModule from './components/DummyModule.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/dummy', component: DummyModule },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router