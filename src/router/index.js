import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from '../views/CatalogPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import BookPage from '../views/BookPage.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: CatalogPage,
 
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/book/:id',
    name: 'BookPage',
    component: BookPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
