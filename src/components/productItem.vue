<template>
    <li class="catalog__item">
       <router-link class="catalog__pic" v-bind:to="{name: 'product', params: {id: product.id}}" >
              <img v-bind:src="product.image"  v-bind:alt="product.title">
       </router-link>

       <button class="button button--primery btn_custom " type="submit" :disabled="false">

                В корзину

              </button>

            <h3 class="catalog__title">
              <a href="#">
                {{product.title}}
              </a>
            </h3>

            <span class="catalog__price">
               {{product.price | numberFormat}}
            </span>

            <ul class="colors colors--black">
              <li class="colors__item" v-for="productColor in product.colors" v-bind:key="productColor.id">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio"
                   :value="productColor.id" v-model="color">
                  <span class="colors__value" v-bind:style="{backgroundColor: productColor.code}">
                  </span>
                </label>
              </li>
            </ul>
    </li>
    </template>

    <script>
      import axios from 'axios';
      import { mapActions } from 'vuex';
      import goToPage from '@/helpers/goToPage';
      import numberFormat from '@/helpers/numberFormat';

      import { API_BASE_URL } from '../config';
      // проксирование компонента из пакета Vuex

    export default {
      data() {
        return {
           // Свойство для API(продукта)
           productData: null,
          color: '#73B6EA',
          // Загрузка данных
          productLoading: false,
          productLoadingFailed: false,

          // создание сообщении о добавлении товара
          productAddSending: false,

          // создание сообщении что товар добавлися
          productAdded: false,
        };
      },
      methods: {
        // goToPage,
         // подмешивание действия в метод компонента
        ...mapActions(['addProductToCart']),
        goToPage,
          // Добавление товара в корзину
          addToCart() {
            // статусы добавлнеия товара
            this.productAdded = false;
            this.productAddSending = true;

            // Передача в действие(actions) ID товара и количество
            this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
            .then(() => {
              this.productAdded = true;
              this.productAddSending = false;
            });
          },
            // Подгрузка информации для API
            loadProduct() {
                this.productLoading = true;
                this.productLoadingFailed = false;
              // Отправка запроса в API
              axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)

                // Сообщение загрузка товаров
                .then((response) => { this.productData = response.data; })
                // Сообщение об ошибке
                .catch(() => { this.productLoadingFailed = true; })
                // Обновление запароса на загрузку завершения товаров
                .then(() => { this.productLoading = false; });
     },
      },
      props: [
      'product',
      ],
      filters: {
        numberFormat,
      },
    };
    </script>
