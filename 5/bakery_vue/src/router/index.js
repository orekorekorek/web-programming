import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '../views/ProductView.vue'
import ProductFormView from '../views/ProductFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'products',
      component: ProductView,
    },
    {
      path: '/products/:id/edit',
      name: 'edit product',
      component: ProductFormView,
    },
    {
      path: '/products/new',
      name: 'new product',
      component: ProductFormView,
    }
  ],
})

export default router
