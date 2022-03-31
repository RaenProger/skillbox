<template>
<main class="content container">
        <div class="content__top content__top--catalog">
            <h1 class="content__title">
                Каталог
            </h1>
        </div>
        <div class="content__catalog">

          <product-filter  v-bind:price-from.sync="filterPriceFrom"
          v-bind:price-to.sync="filterPriceTo" v-bind:category-id.sync="filterCategoryId" v-bind:filter-color.sync="filterColor" v-on:update-filters="goToFirstPage"></product-filter>

            <section class="catalog">

                 <div v-if="productsLoading"><div class="lds-facebook"><div></div><div></div><div></div></div></div>
                <div v-if="productsLoadingFailed">Произошла ошибка при загрузке ...<button @click.prevent="loadProducts">Попробуйте еще разик</button></div>

          <product-list v-if="!productsLoading" v-bind:products="filteredProducts"></product-list>

   <base-pagination v-model="page" v-bind:count="countProducts" v-bind:per-page="productsPerPage"></base-pagination>
      </section>
        </div>
    </main>
</template>
<script>
// пакет для отправки http запросов
import axios from 'axios';

// import products from '@/data/products';
import productList from '@/components/productList.vue';
import basePagination from '@/components/basePagination.vue';
import productFilter from '@/components/productFilter.vue';
import { API_BASE_URL } from '../config';

export default {
    components: {
      productList,
      basePagination,
      productFilter,
       },
       // 1.Создание новых свойств для полей фильтра
    data() {
        return {
          filterColor: null,
          filterPriceFrom: 0,
          filterPriceTo: 0,
          filterCategoryId: 0,
          page: 1,
          productsPerPage: 6,
          loadState: true,

           // Свойство состояния для API серевера
          productsData: null,
          //  загрузка товара
          productsLoading: false,
          //  Ошибка загрузки товара
          productsLoadingFailed: false,
        };
    },
    computed: {
      // 3.  фильтрации локально

      filteredProducts() {
      let filteredProducts = this.products;
       if (this.filterColor) {
        filteredProducts = filteredProducts.filter((product) => product.colors.some((color) => color.id === this.filterColor));
      }
      return filteredProducts;
      },
      /* if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter((product) => product.categoryId === this.filterCategoryId);
      }
      */
      // 2.Замена на отфилитораванные товары

        // вывод изображения товаров с API
        products() {
        return this.productsData ? this.productsData.items.map((product) => ({
            ...product,
            image: product.image.file.url,
          }))
        : [];
      },
      countProducts() {
        // API
        return this.productsData ? this.productsData.pagination.total : 0;
      },
    },

    // Отслеживание товаров с API
    watch: {
      page() {
        this.loadProducts();
      },
      filterPriceTo() {
          this.loadProducts();
      },
      filterPriceFrom() {
          this.loadProducts();
      },
      filterCategoryId() {
          this.loadProducts();
      },

    },
    methods: {
      goToFirstPage() {
        this.page = 1;
      },

       // метод для загрузки с api
   loadProducts() {
     this.productsLoading = true;
     this.productsLoadingFailed = false;
     clearTimeout(this.loadProductsTimer);
     this.loadProductsTimer = setTimeout(() => {
   axios
        .get(`${API_BASE_URL}/api/products`, {
              params: {
                page: this.page,
                limit: this.productsPerPage,
                categoryId: this.filterCategoryId,
                minPrice: this.filterPriceFrom,
                maxPrice: this.filterPriceTo,
              },
        })
        // Сообщение загрузка товаров
        .then((response) => { this.productsData = response.data; })
        // Сообщение об ошибке
        .catch(() => { this.productsLoadingFailed = true; })
        // Обновление запароса на загрузку товаров
        .then(() => { this.productsLoading = false; });
        }, 1000);
      },
    },
    // вызов хука для метода загрузки с api
    created() {
this.loadProducts();
    },
};
</script>

<style lang="scss">

/* preloader styles */
.header__wrapper {
    display: flex;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    padding-top: 23px;
    padding-bottom: 23px;
    justify-content: space-between;

    .header__tel {
    margin-left: 0;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
}
}

.catalog__pic img {
width: 100%;
height: 100%;
object-fit: contain;
}

.lds-facebook{
 position: fixed;
   left: 0;
   top: 0;
   opacity: 1;
   background: white;
   width: 100%;
   height: 100%;
   z-index:0.1;
}

.lds-facebook div {
  display: inline-block;
  position: absolute;
  margin-left: 210%;
  margin-top: 130%;
  left: 10px;
  width: 16px;
  background: green;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}

//MAIN STYLES
  .catalog{
        display: flex;
        flex-wrap: wrap;

        .btn_custom{
          margin-left:60px;
          margin-bottom: 20px;
        }

        .header__logo {
            height: 33px;
            margin: 0 30%;
        }

           .catalog__pic{
                img {
                width: 100%;
                height: 80%;
                -o-object-fit: contain;
                object-fit: contain;
          }
      }
  }

/* MEDIA QUERIES*/

 @media (max-width: 1199px) {
   .content__catalog {
    grid-template-columns: 210px 1fr;
}
}

/* md-размер (<=991px) */
@media (max-width: 991px) {

  .content__top--catalog {
    margin-left: 0px;
    text-align: center;
}
  .filter{
    display: none;
  }

  .footer__social {
    margin-left: 0px;
    -ms-flex-item-align: start;
    align-self: flex-start;
}

.footer__data {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    /* grid-template-columns: repeat(2,auto); */
    grid-gap: 10px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    /* grid-column: 2/3; */
    grid-row: 3/4;
     flex-direction: column;
    flex-wrap: wrap;
}

}

/* sm-размер (<=768px) */
@media (max-width: 767px) {

  .catalog__list {
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 65px 30px;
  margin: 0 0 70px;
}

 .footer__wrapper {
    display: grid;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: flex-start;
    padding-bottom: 60px;
    grid-template-columns: repeat(1,auto);
}
.footer__links {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2,auto);
    grid-gap: 20px 30px;
}
}

/* xs-размер (<=575px) */
@media (max-width: 575px) {

    .catalog__list {
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(1, auto);
  grid-gap: 65px 30px;
  margin:0 70px;
}

.catalog__pagination {
  margin-top: 30px;
}
  .footer__social {
    margin-left: 30px;
    align-self: flex-start;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-evenly;
    align-items: flex-end;
    align-content: space-around;
}
.footer__data {
    list-style-image: initial;
    margin-top: -90px;
}
}

</style>
