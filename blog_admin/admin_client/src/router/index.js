import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin'),
    children: [
      {
        path: '',
        name: 'AdminWelcome',
        component: () => import('../views/Admin/Welcome/index')
      },
      {
        path: 'blogManage',
        name: 'BlogManage',
        component: () => import('../views/Admin/Blog/BlogManage')
      },{
        path: 'tagManage',
        name: 'TagManage',
        component: () => import('../views/Admin/Blog/TagManage')
      },{
        path: 'diaryManage',
        name: 'DiaryManage',
        component: () => import('../views/Admin/Diary/DiaryManage')
      },{
        path: 'linksManage',
        name: 'LinksManage',
        component: () => import('../views/Admin/Links/LinksManage')
      },{
        path: 'messageManage',
        name: 'TMessageManage',
        component: () => import('../views/Admin/Message/MessageManage')
      },{
        path: 'userManage',
        name: 'UserManage',
        component: () => import('../views/Admin/User/UserManage')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  }
];

const router = new VueRouter({
  routes
});

export default router
