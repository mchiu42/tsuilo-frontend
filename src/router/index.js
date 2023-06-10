import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layouts/Base.vue'
import BoardLayout from '@/layouts/Board.vue'

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
        path: '/board/:id',
        name: 'board',
        component: BoardLayout,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router