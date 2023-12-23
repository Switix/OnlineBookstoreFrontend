import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from '../views/CatalogPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import BookPage from '../views/BookPage.vue'
import LoginPage from '../views/LoginPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import ProfileEditPage from '../views/ProfileEditPage.vue'
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
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage
  },
  {
    path: '/profile/edit',
    name: 'ProfileEditPage',
    component: ProfileEditPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
