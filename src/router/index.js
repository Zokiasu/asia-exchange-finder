import { createRouter, createWebHistory } from 'vue-router'
import AboutUs from '../views/About/AboutUs.vue'
import Contact from '../views/About/Contact.vue'
import Privacy from '../views/About/Privacy.vue'
import Terms from '../views/About/Terms.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Test from '../views/Test.vue'
import Dashboard from '../views/Dashboard.vue'

import Home from '../views/Asia-Exchange-Finder/Home.vue'
import EditorView from '../views/Asia-Exchange-Finder/EditorView.vue'
import AEF from '../views/AEF.vue'
import firebase from "firebase";

const routes = [
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
    path: '/',
    name: 'AEF',
    component: AEF,
    children: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/editorview',
      name: 'EditorView',
      component: EditorView
    },
    {
      path: '/editUniversity',
      name: 'UniversityEditor',
      component: () => import("../views/UniversityEditor.vue"),
    }]
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
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
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
