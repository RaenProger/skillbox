<template>
   <ul class="catalog__list">
         <product-item v-bind:product="product" v-for="(product) in products" v-bind:key="product.id"></product-item>
      </ul>
</template>

<script>
import productItem from './productItem.vue';

export default {
    props: [
      'products',
      ],
    components: {
      productItem,
      },
};
</script>
