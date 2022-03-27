import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/mainPage.vue';
import ProductPage from '@/pages/productPage.vue';
import CartPage from '@/pages/cartPage.vue';
import NotFoundPage from '@/pages/notFoundPage.vue';
import OrderPage from '@/pages/orderPage.vue';
import OrderInfoPage from '@/pages/orderInfoPage.vue';

Vue.use(VueRouter);

const routes = [
    { name: 'main', component: MainPage, path: '/' },
    { name: 'product', component: ProductPage, path: '/product/:id' },
    { name: 'cart', component: CartPage, path: '/basket' },
    { name: 'order', component: OrderPage, path: '/order' },
    { name: 'orderInfo', component: OrderInfoPage, path: '/order/:id' },
    { name: 'notFound', component: NotFoundPage, path: '*' },
];
const router = new VueRouter({
    routes,
});

export default router;
