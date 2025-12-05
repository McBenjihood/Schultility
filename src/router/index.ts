import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AccountView from "@/views/AccountView.vue";
import LoginComponent from "@/components/AccountView/loginComponent.vue";
import RegisterComponent from "@/components/AccountView/registerComponent.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/account',
        name: 'account',
        component: AccountView,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            }]
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
