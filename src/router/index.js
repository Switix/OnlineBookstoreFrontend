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
import OrderCreatePage from '../views/OrderCreatePage.vue'
import ShipmentPage from '../views/ShipmentPage.vue'
import OrderPage from '../views/OrderPage.vue'
import OrderDetailsPage from '../views/OrderDetailsPage.vue'
import ManageOrdersPage from '../views/ManageOrdersPage.vue'
import ManageAuthorsPage from '../views/ManageAuthorsPage.vue'
import ManageCategoriesPage from '../views/ManageCategoriesPage.vue'
import AdminPanelPage from '../views/AdminPanelPage.vue'


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
  {
    path: '/orders/create',
    name: 'OrderCreatePage',
    component: OrderCreatePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/orders/shipment',
    name: 'ShipmentPage',
    component: ShipmentPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'OrderPage',
    component: OrderPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/orders/:id',
    name: 'OrderDetailsPage',
    component: OrderDetailsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/adminPanel/manageOrders',
    name: 'ManageOrdersPage',
    component: ManageOrdersPage,
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  {
    path: '/adminPanel/manageAuthors',
    name: 'ManageAuthorsPage',
    component: ManageAuthorsPage,
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  {
    path: '/adminPanel/manageCategories',
    name: 'ManageCategoriesPage',
    component: ManageCategoriesPage,
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  {
    path: '/adminPanel',
    name: 'AdminPanelPage',
    component: AdminPanelPage,
    meta: { requiresAuth: true, requiresAdmin: true } 
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Route navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = Store.state.user.isLoggedIn ;
  const isAdmin = Store.state.user.isAdmin; 
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
        // If the route requires admin role and the user is not admin, redirect to login
        next('/login');
      } else {
        next();
      }
    }
  } else {
    next(); // For routes that don't require authentication, proceed with navigation
  }
});
export default router
