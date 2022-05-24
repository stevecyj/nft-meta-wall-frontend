import { createRouter, createWebHashHistory } from 'vue-router';
/* Layout */
import Layout from '@/layout/index.vue';

const routes = [
  {
    path: "/login",
    name: "Login",
    meta:{
      title:'登入',
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: "/signup",
    name: "Signup",
    meta:{
      title:'註冊',
    },
    component: () => import('@/views/Signup.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import("@/views/Home.vue"),
        name: 'Home',
        meta: { title: '首頁' }
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    children: [
      {
        path: ':id',
        component: () => import('@/views/Personal.vue'),
        name: 'Personal',
        meta: { title: '我的貼文牆' },
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Profile.vue'),
        name: 'Profile',
        meta: { title: '修改個人資料' }
      }
    ]
  },
  {
    path: '/follower',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Follower.vue'),
        name: 'Follower',
        meta: { title: '追蹤名單' }
      }
    ]
  },
  {
    path: '/like-posts',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/LikePosts.vue'),
        name: 'LikePosts',
        meta: { title: '我按讚的貼文' }
      }
    ]
  },
  {
    path: '/publish-post',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/PublishPost.vue'),
        name: 'PublishPost',
        meta: { title: '張貼動態' }
      }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



export default router;
