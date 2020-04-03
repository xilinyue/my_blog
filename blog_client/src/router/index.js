import Vue from 'vue'
import VueRouter from 'vue-router'

import userService from "../api/userService";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import('../views/Blog')
  },
  {
    path: '/diary',
    name: 'Diary',
    component: () => import('../views/Diary')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message')
  },
  {
    path: '/links',
    name: 'Links',
    component: () => import('../views/Links')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About'),
    meta: { requireBack: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Users/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Users/register.vue')
  }
];

const router = new VueRouter({
  routes
});

//去登陆时留下信息
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireBack)) {
    userService.getIfUserLogin().then(res => {
      if (res.data.ifLogin){
        next();
      }else{
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      }
    });
  } else {
    next() // 确保一定要调用 next()
  }
});

export default router
