import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
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
  }
];

const router = new VueRouter({
  routes
});

export default router
