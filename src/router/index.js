import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from '../views/CatalogPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: CatalogPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
