import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('views/home/Home')
const Admin = () => import('views/home/admin')
const Login = () => import('views/home/adminLogin')
const HomeChildren = () => import('views/home/HomeChildren')
Vue.use(VueRouter)

const routes= [
  {
    path: '',
    redirect: '/home'
  },
  { 
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        redirect: 'news',
      },
      {
        path: 'news',
        component: HomeChildren
      }
    ]
  },
  { 
    path: '/home',
    component: Home,
    children: [
      {
        path: 'news/*:id',
        component: HomeChildren
      },

    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
      path: '/login/admin',
      component: Admin
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  
})

export default router