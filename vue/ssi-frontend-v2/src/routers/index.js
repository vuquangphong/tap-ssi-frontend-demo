import { createWebHistory, createRouter } from "vue-router";
import Home from '../pages/home/HomePage.vue';
import Login from '../pages/login/LoginPage.vue';

const routes = [
    { path: '/home', component: Home },
    { path: '/login', component: Login }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;