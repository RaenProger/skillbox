import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
/* import products from '@/data/products'; */
import { API_BASE_URL } from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartProducts: [], /* [{ productId: 1, amount: 2 },] */

        // Создание уникального ключа пользователя с API
        userAccessKey: null,

        // Информация о товарах в корзине c API
        cartProductsData: [],

        // создание состояния для страницы информации о заказе
        orderInfo: null,
    },
    mutations: {
        // запись данных в orderInfo
        updateOrderInfo(state, orderInfo) {
            state.orderInfo = orderInfo;
        },
        // сброс корзины
        resetCart(state) {
            state.cartProducts = [];
            state.cartProductsData = [];
        },
        // добавление товара и количества в корзину//
       updateCartProductAmount(state, { productId, amount }) {
            // проверка на товара число
        if (!Number.isNaN(amount)) {
        const element = state.cartProducts.find((item) => item.productId === productId);

        if (element) {
            element.amount = amount;
       }
    }
    },
    /* удаление товара */
     deleteCartProducts(state, productId) {
         state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
     },
     // изменение свойства ключа пользователя с API
     updateUserAccessKey(state, accessKey) {
        state.userAccessKey = accessKey;
     },
     // изменение инфомрации о товаре с API
     updateCartProductsData(state, items) {
            state.cartProductsData = items;
     },

     // создание мутации для синххрониции данных из API с оригинальным массивом CartProducts
     syncCartProducts(state) {
         state.cartProducts = state.cartProductsData.map((item) => ({
                 productId: item.product.id,
                 amount: item.quantity,
             }));
     },
    },
    getters: {
        cartDetailProducts(state) {
return state.cartProducts.map((item) => {
    const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);

    return {
       ...item,
        product, // Локальная база // products.find((p) => p.id === item.productId),
        image: product.image.file.url,
    };
});
        },
        cartTotalPrice(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
        },
        cartProductsCount(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => item.amount + acc, 0);
        },
    },

    // действие получения информации о корзине из API
    actions: {

        loadCart(context) {
            return axios
            .get(`${API_BASE_URL}/api/baskets`, {
                params: {
                userAccessKey: context.state.userAccessKey,
                },
            })
            .then((response) => {
                // проверка локального хранилища
                if (!context.state.userAccessKey) {
                    localStorage.setItem('userAccessKey', response.data.user.accessKey);

                    context.commit('updateUserAccessKey', response.data.user.accessKey);
                }

                context.commit('updateCartProductsData', response.data.items);

                // вызов синхронизации
                context.commit('syncCartProducts');
            });
        },
       // добавления товара в корзину
        addProductToCart(context, { productId, amount }) {
            // отправка запроса на сервер
            return axios
            .post(`${API_BASE_URL}/api/baskets/products`, {
                productId,
                quantity: amount,
              }, {
                params: {
                    userAccessKey: context.state.userAccessKey,
                },
              })
              .then((response) => {
                context.commit('updateCartProductsData', response.data.items);

                // вызов синхронизации
                context.commit('syncCartProducts');
              });
        },
          // создание действия для API при измении колиства товара
    updateCartProductAmount(context, { productId, amount }) {
        // вызов мутации отвечающей за изменнение данных за количество товара в массиве cartProducts
        context.commit('updateCartProductAmount', { productId, amount });

        if (amount < 1) {
            return;
        }

       axios
      .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
              userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        // вызов синхронизации при ошибке
        .catch(() => {
          context.commit('syncCartProducts');
        });
  },
   // создание действия для API при удалении товара
  deleteCartProducts(context, { productId }) {
    axios
    .delete(`${API_BASE_URL}/api/baskets/products`, {
        data: { productId },
        params: {
            userAccessKey: context.state.userAccessKey,
        },
 })
      .then((response) => {
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
      });
  },
   // загрузка данных о заказе по ID покупателя
   loadOrderInfo(context, orderId) {
    return axios
    .get(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
        userAccessKey: context.state.userAccessKey,
        },
    })
    // вызов мутации для занесение информации в orderInfo
    .then((response) => {
        context.commit('updateOrderInfo', response.data);
    });
   },
},
});
