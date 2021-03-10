import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AboutUs from '../views/About/AboutUs.vue'
import Contact from '../views/About/Contact.vue'
import Privacy from '../views/About/Privacy.vue'
import Terms from '../views/About/Terms.vue'
import EditorView from '../views/EditorView.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Test from '../views/Test.vue'
import Dashboard from '../views/Dashboard.vue'
import firebase from "firebase";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms
  },
  {
    path: '/editorview',
    name: 'EditorView',
    component: EditorView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    /*meta: {
      requiresAuth:true
    }*/
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    const authenticatedUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    
    if ( requiresAuth && !authenticatedUser ) {
        alert("You are not authorized to access this area.");
        next("/");
    }
    else {
        next();
    }
});

export default router
