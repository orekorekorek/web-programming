import { createRouter, createWebHistory } from 'vue-router';
import Fractal from '../components/Fractal.vue';

const routes = [
    { path: '/', name: 'Fractal1000', component: Fractal, props: { wdt: 500, hgt: 500 } },
    { path: '/large', name: 'Fractal1732', component: Fractal, props: { wdt: 1732, hgt: 1732 } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
