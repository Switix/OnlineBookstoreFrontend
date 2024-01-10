import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from '../views/CatalogPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import BookPage from '../views/BookPage.vue'
import LoginPage from '../views/LoginPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import ProfileEditPage from '../views/ProfileEditPage.vue'
import BillingAddressEditPage from '../views/BillingAddressEditPage.vue'
import ShippingAddressEditPage from '../views/ShippingAddressEditPage.vue'
import ShoppingCartPage from '../views/ShoppingCartPage.vue'

import Store from '../store';
const routes = [
  {
    path: '/',
    name: 'catalogPage',
    component: CatalogPage,
 
  },
  {
    path: '/register',
    name: 'registerPage',
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
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/edit',
    name: 'ProfileEditPage',
    component: ProfileEditPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/billingAddress',
    name: 'BillingAddressEditPage',
    component: BillingAddressEditPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/shippingAddress/:id?',
    name: 'ShippingAddressEditPage',
    component: ShippingAddressEditPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/shoppingCart',
    name: 'ShoppingCartPage',
    component: ShoppingCartPage,
    meta: { requiresAuth: true }
  },
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Route navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = Store.state.isLoggedIn ;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next(); // For routes that don't require authentication, proceed with navigation
  }
});
export default router
