<template>
    <li class="catalog__item">
       <router-link class="catalog__pic" v-bind:to="{name: 'product', params: {id: product.id}}" >
              <img v-bind:src="product.image"  v-bind:alt="product.title">
       </router-link>

       <button class="button button--primery btn_custom " type="submit" @click="addProductToCart">

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
      import goToPage from '@/helpers/goToPage';
      import numberFormat from '@/helpers/numberFormat';

    export default {
       props: [
      'product',
      ],
      data() {
        return {
          color: '#73B6EA',
        };
      },
      methods: {
        goToPage,
        addProductToCart() {
        this.$store.dispatch('addProductToCart', { productId: this.product.id, amount: 1 });
      },
      },
      filters: {
        numberFormat,
      },
    };
    </script>
