import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdminLogin from '../views/AdminLogin.vue'
import Dashboard from '../views/Dashboard.vue'
import About from '../views/About.vue'
import UniversityForm from '../components/UniversityForm.vue'
import firebase from "firebase";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },/*
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },*/
  {
    path: '/admin',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path: '/form',
    name: 'UniversityForm',
    component: UniversityForm,
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    /*meta: {
      requiresAuth:true
    }*/
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    const authenticatedUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    
    if ( requiresAuth && ! authenticatedUser ) {
        alert("You are not authorized to access this area.");
        next("/");
    }
    else {
        next();
    }
});

export default router
