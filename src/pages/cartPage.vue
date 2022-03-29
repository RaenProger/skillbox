<template>
<main class="content container">
    <div class="content__top">
     <!--  <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul> -->

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ productCount }} товаров
      </span>
    </div>
     <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">

            <cart-item v-for="item in products" :key="item.productId" :item="item"/>

          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{totalPrice | numberFormat}} ₽</span>
          </p>

          <router-link tag="button" :to="{name: 'order'}" class="cart__button button button--primery" type="submit" v-show="products.length !==0">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
</main>
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import cartItem from '@/components/cartItem.vue';

export default {
components: { cartItem },
data() {
       return {
           productAmount: 1,
       };
    },
filters: { numberFormat },
computed: {
  ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', productCount: 'cartProductsCount' }),
},
};
</script>

<style lang="scss">
.form__counter button:hover {
    cursor: pointer;
}
.button-del:hover {
  cursor: pointer;

}

/* MEDIA QUERIES*/
 @media (max-width: 1199px) {

.product {
    display: grid;
    grid-template-columns: 120px 150px 140px 50px 20px;
    grid-template-rows: repeat(3, -webkit-min-content);
    grid-template-rows: repeat(3, min-content);
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    grid-gap: 10px 20px;
}
 }

  @media (max-width: 991px) {

      .cart__form {
          display: grid;
          grid-template-columns: auto;
          grid-template-rows: auto 1fr;
          grid-gap: 20px 50px;
          -webkit-box-align: start;
          -ms-flex-align: start;
          align-items: flex-start;
      }

      .product {
          grid-template-columns: 170px 170px 170px 100px 20px;
      }
  }

  @media (max-width: 991px) {
              .product {
              grid-template-columns: 120px 150px 140px 50px 20px;
              }
    }

    @media (max-width: 557px) {
      .footer__link {
      font-size: 13px;
}

    .product {
        display: grid;
        grid-template-columns: 100px 110px 60px 50px 20px;
    }

    .form__counter input {
    padding: 23px 5px;
    width: 39px;
    font-size: 19px;
      }

      .form__counter {
        width: 70px;
      }
          .form__counter button {
        width: 10px;
        margin-left: 3px;
      }
        .cart__button {
        margin-top: 20px;

      }
    }
</style>
