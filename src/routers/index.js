import { createWebHistory, createRouter } from "vue-router";
import Home from '../pages/home/HomePage.vue';
import Login from '../pages/login/LoginPage.vue';
import Issue from '../pages/issue/IssuePage.vue';
import Presentation from "../pages/presentation/PresentationPage.vue";
import Verify from "../pages/verify/VerifyPage.vue";

const routes = [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/issue', component: Issue },
    { path: '/presentation', component: Presentation },
    { path: '/verify', component: Verify }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;