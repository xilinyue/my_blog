import Vue from 'vue'
import VueRouter from 'vue-router'

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
    component: () => import('../views/About')
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

export default router
