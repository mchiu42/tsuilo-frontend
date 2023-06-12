import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layouts/Base.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            requiresAuth: false,
            extendsLayout: BaseLayout,

        }
    },
    {
        path:'/workspaces',
        component: () => import('@/views/WorkSpaces.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router