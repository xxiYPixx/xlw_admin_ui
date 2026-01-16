import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '../layouts/BaseLayout.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import ProductsView from '../views/ProductsView.vue'
import OrdersView from '../views/OrdersView.vue'
import FeesView from '../views/FeesView.vue'
import DiscountRulesView from '../views/DiscountRulesView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { public: true }
    },
    {
        path: '/',
        component: BaseLayout,
        redirect: '/users',
        children: [
            { path: 'users', name: 'users', component: UsersView },
            { path: 'products', name: 'products', component: ProductsView },
            { path: 'orders', name: 'orders', component: OrdersView },
            { path: 'fees', name: 'fees', component: FeesView },
            { path: 'discount-rules', name: 'discount-rules', component: DiscountRulesView },
            { path: 'categories', name: 'categories', component: CategoriesView }
        ]
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { public: true } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    if (to.meta.public) {
        return true
    }
    const token = localStorage.getItem('token')
    if (!token) {
        return { path: '/login' }
    }
    return true
})

export default router
