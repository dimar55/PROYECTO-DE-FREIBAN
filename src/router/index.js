import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Menu from '../views/Menu.vue'
import VerDocumentos from '../views/VerDocumentos.vue'
import axios from "axios";


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: Menu
  },

  {
    path: '/VerDocumentos/:Id_equipo',
    name: 'VerDocumentos',
    component: VerDocumentos
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  if (
    !sessionStorage.getItem('jwt') &&
    to.name !== 'Login'
  ) {
    
    return { name: 'Login' }
  }else{
    let token = sessionStorage.getItem('jwt');
    let res = await axios.post("https://app-controljf.herokuapp.com/user/verifyToken", {token})
    .then((result)=>{
      return result.data.success
    }).catch((err)=>{
      return false;
    });
    if(!res && to.name !== 'Login'){
      return { name: 'Login' }
    }
  }

})

router.beforeEach(async (to, from) => {
  if (
    sessionStorage.getItem('jwt') &&
    to.name == 'Login'
  ) {
    let token = sessionStorage.getItem('jwt');
    let res = await axios.post("https://app-controljf.herokuapp.com/user/verifyToken", {token})
    .then((result)=>{
      return result.data.success
    }).catch((err)=>{
      return false;
    });
    if(res){
      return { name: 'Menu' }
    }
  }

})



export default router
