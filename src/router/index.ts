import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditUser from '../views/EditUser.vue'
import EditNivel from '../views/EditNivel.vue'
import CreateUser from '../views/CreateUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/formulario/:id',
      name: 'usuarios',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: EditUser
    },
    
    {
      path: '/nivel/:id',
      name: 'niveles',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: EditNivel
    },
    {
      path: '/formulario',
      name: 'createUser',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CreateUser
    },
    {
    //para toda ruta que no existe rediccionar al home
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }

  ]
})

export default router
