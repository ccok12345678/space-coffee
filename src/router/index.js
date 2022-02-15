import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/frontend/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'shop/:classing',
        name: 'Shop',
        component: () => import('../views/frontend/UserProducts.vue'),
      },
      {
        path: 'product/:id',
        name: 'ViewProduct',
        component: () => import('../views/frontend/UserViewProduct.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/frontend/UserCart.vue'),
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../views/frontend/UserOrder.vue'),
      },
      {
        path: '/order/:orderId',
        name: 'Check',
        component: () => import('../views/frontend/UserCheck.vue'),
      },
      {
        path: 'orders',
        name: 'UserOrders',
        component: () => import('../views/frontend/UserOrders.vue'),
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: () => import('../views/frontend/UserFavorites.vue'),
      },
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('../views/frontend/UserBlog.vue'),
      },
      {
        path: 'blog/:articleId',
        name: 'Article',
        component: () => import('../views/frontend/UserArticle.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/backend/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
      {
        path: 'articles',
        name: 'Articles',
        component: () => import('../views/backend/Articles.vue'),
      },
    ],
  },
  // 404 page
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
