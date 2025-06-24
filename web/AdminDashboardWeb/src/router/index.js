import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from '../views/DashBoard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    component: DashBoard,
    children: [
      {
        path: 'management',
        name:'User Management',
        component: () => import('../views/dashboard/UserManagement.vue')
      },
      {
        path: 'order',
        name:'Order Management',
        component: () => import('../views/dashboard/Order.vue')
      },
      {
        path: 'product',
        name: 'Product Management',
        component: () => import('../views/dashboard/ProductManagement.vue'),

      },
      {
        path: 'optimize-route',
        name:'Optimize Route',
        component: () => import('../views/dashboard/OptimizeRoute.vue')
      },
      {
        path: 'product-create',
        name: 'Product Create',
        component: () => import('../views/dashboard/ProductCreate.vue')
      },
      {
        path: 'product-update',
        name: 'Product Update',
        component: () => import('../views/dashboard/ProductUpdate.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('accessToken')
  let requiredAuth = ['/dashboard'] 
  // add route to requiredAuth
  if (!token && requiredAuth.find((r) => to.path.includes(r))) {
    next('/')
  } else {
    next()
  }
})

export default router
