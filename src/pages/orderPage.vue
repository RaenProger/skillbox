<template>
  <main class="content container">
     <div class="content__top">
      <!-- <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html"> Корзина </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul> -->

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ productCount }} товаров</span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <baseFormText v-model="formData.name" :error="formError.name" title="ФИО" placeholder="Введите ваше полное имя"/>

            <label class="form__label">
              <input
                class="form__input"
                v-model="formData.address"
                type="text"
                name="address"
                placeholder="Введите ваш адрес"
              />
              <span class="form__value">Адрес доставки</span>
              <span class="form__error" v-if="formError.address">{{ formError.phone }}</span>
            </label>

            <label class="form__label">
              <input
                class="form__input"
                v-model="formData.phone"
                type="tel"
                name="phone"
                placeholder="Введите ваш телефон"
              />
              <span class="form__value">Телефон</span>
              <span class="form__error" v-if="formError.phone">{{ formError.phone }}</span>
            </label>

            <label class="form__label">
              <input
                class="form__input"
                v-model="formData.email"
                type="email"
                name="email"
                placeholder="Введи ваш Email"
              />
              <span class="form__value">Email</span>
              <span class="form__error" v-if="formError.email">{{ formError.phone }}</span>
            </label>

            <base-form-textarea title="Комментарий к заказу" :error="formError.comment" v-model="formData.comment"
                placeholder="Ваши пожелания"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    v-model="courierDelivery"
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                  />
                  <span class="options__value"> Самовывоз <b>бесплатно</b> </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input v-model="courierDelivery" class="options__radio sr-only" type="radio" name="delivery" value="500" />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input  v-model="paymentMethod" class="options__radio sr-only" type="radio" name="pay" value="card" />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input v-model="paymentMethod" class="options__radio sr-only" type="radio" name="pay" value="cash" />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">

           <cart-block v-for="item in products" :key="item.productId" :item="item"/>

          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{courierDelivery}}</b></p>
            <p>Итого: <b>{{totalPriceWithDelivery | numberFormat}} ₽</b></p>
          </div>

          <button   class="cart__button button button--primery" type="submit">Оформить заказ</button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
                {{formErrorMessage}}
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import baseFormText from '@/components/baseFormText.vue';
import baseFormTextarea from '@/components/baseFormTextarea.vue';
import { API_BASE_URL } from '../config';
import cartBlock from '@/components/cartBlock.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  components: { baseFormText, baseFormTextarea, cartBlock },
  filters: { numberFormat },
  // создание состояния для хранения значений полей в форме
  data() {
    return {
      // создание переменной для способа оплаты
      paymentMethod: null,
      // создание переменной для доставки
      courierDelivery: 0,
      // свойство для формы
      formData: {},
      // свойство для обработки ошибок
      formError: {},
      // свойство сообщения об ошибки
      formErrorMessage: '',
      // прелоадер
      preLoader: false,
    };
  },
  // создание функции для отправки данных заказа товара для API
    methods: {
      order() {
        // очиста запроса после заполнения формы
        this.formError = {};
        // сброс значения сообщения об ошибке при отправке
         this.formErrorMessage = '';
        // отправка запроса
        axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        // вызов иутации сброса очистки корзины
        .then((response) => {
          this.$store.commit('resetCart');
          // вызов мутации для обработки иформации заказа
          this.$store.commit('updateOrderInfo', response.data);
          // перенаправление на страницу заказа
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id, deliveryPrice: this.courierDelivery, paymentMethod: this.paymentMethod } });
        })
        // отлов ошибок
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
      },
    },
    computed: {
  ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', productCount: 'cartProductsCount' }),
    totalPriceWithDelivery() {
        return this.totalPrice + +this.courierDelivery;
      },
},

};
</script>
