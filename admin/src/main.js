import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Login from './components/LoginPage.vue';
import Register from './components/RegisterPage.vue';
import Dashboard from './components/DashboardPage.vue';
import Home from './components/HomePage.vue';
import Reading from './components/ReadingPage.vue';
import Wishlist from './components/WishlistPage.vue';


const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'reading', component: Reading },
      { path: 'wishlist', component: Wishlist },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
