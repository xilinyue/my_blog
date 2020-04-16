import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';
import userService from "../api/userService";

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    beforeEnter(to,from,next){
        //判断是否登录
        if (store.userInfo){
            next();
        }else{
            //然后发起请求查看是否登录，本地可能刷新了
            userService.ifLogin().then(res => {
                if (res.code === 0){
                  store.dispatch('login',res.data);
                  next();
                }else{
                  next("/login")
                }
            });
        }
    },
    component: () => import('../views/Admin'),
    children: [
      {
        path: '',
        name: 'AdminWelcome',
        component: () => import('../views/Admin/Welcome/index')
      },{
        path: 'blogManage',
        name: 'BlogManage',
        component: () => import('../views/Admin/Blog/BlogManage')
      },{
        path: 'blog/:id',
        name: 'AddAndEditBlog',
        component: () => import('../views/Admin/Blog/BlogEditAndAdd')
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
