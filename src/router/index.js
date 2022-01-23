import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'shop/:classing',
        name: 'Shop',
        component: () => import('../views/User_Products.vue'),
      },
      {
        path: 'product/:id',
        name: 'ViewProduct',
        component: () => import('../views/User_ViewProduct.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/User_Cart.vue'),
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../views/User_Order.vue'),
      },
      {
        path: '/order/:orderId',
        name: 'Check',
        component: () => import('../views/User_Check.vue'),
      },
      {
        path: 'orders',
        name: 'UserOrders',
        component: () => import('../views/User_Orders.vue'),
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: () => import('../views/User_Favorites.vue'),
      },
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('../views/User_Blog.vue'),
      },
      {
        path: 'blog/:articleId',
        name: 'Article',
        component: () => import('../views/User_Article.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/Orders.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('../views/Coupons.vue'),
      },
      {
        path: 'articles',
        name: 'Articles',
        component: () => import('../views/Articles.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
