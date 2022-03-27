<template>
     <li class="cart__order">
              <h3> {{ item.product.title }}</h3>
              <b> {{amount * item.product.price | numberFormat}}</b>
              <span>Артикул: {{item.product.id}}</span>
            </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
    props: ['item'],
   filters: { numberFormat },
   computed: {
// проверка свойства quantity на "не число"
              amount() {
                return this.item.quantity && !Number.isNaN(this.item.quantity) ? this.item.quantity : this.item.amount;
              },
   },
};
</script>
