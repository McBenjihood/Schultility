import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AccountView from "@/views/AccountView.vue";
import LoginComponent from "@/components/AccountView/loginComponent.vue";
import RegisterComponent from "@/components/AccountView/registerComponent.vue";
import {checkAuth} from "@/assets/js/API";
import AccountManagment from "@/components/AccountView/AccountManagment.vue";

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
            },
            {
                path: 'manage',
                component: AccountManagment
            }
        ]
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;