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
              <li class="colors__item" v-for="productColor in product.colors" v-bind:key="productColor.color.id">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio"
                   :value="productColor.color.id" v-model="color">
                  <span class="colors__value" v-bind:style="{backgroundColor: productColor.color.code}">
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
       filters: {
        numberFormat,
      },
      data() {
        return {
          color: 0,
        };
      },
      methods: {
        goToPage,
        addProductToCart() {
        this.$store.dispatch('addProductToCart', {
           productOfferId: this.product.offers[0].id,
           colorId: this.color,
            amount: 1,
});
      },
      },
        mounted() {
          this.color = this.product.colors[0].color.id;
        },
    };
    </script>
