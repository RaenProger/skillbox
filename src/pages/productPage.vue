<template>
      <main class="content container" v-if="productLoading">Загрузка товара...</main>
      <main class="content container" v-else-if="!productData">Не удалоcь загрузить товар</main>
     <main class="content container" v-else>

   <!--  <div class="content__top">

      <ul class="breadcrumbs">

        <li class="breadcrumbs__item">

          <router-link class="breadcrumbs__link" v-bind:to="{name: 'main'}">

            Каталог

          </router-link>

        </li>

        <li class="breadcrumbs__item">

          <router-link class="breadcrumbs__link" v-bind:to="{name: 'main'}">

           {{category.title}}

          </router-link>

        </li>

        <li class="breadcrumbs__item">

          <a class="breadcrumbs__link">

           {{product.title}}

          </a>

        </li>

      </ul>

    </div>
 -->
    <section class="item">

      <div class="item__pics pics">

        <div class="pics__wrapper">

          <img width="520"  v-bind:src="product.image.file.url" v-bind:alt="product.title">

        </div>

      </div>

      <div class="item__info">

       <!--  <span class="item__code">{{product.id}}</span> -->

        <h2 class="item__title">

          {{product.title}}

        </h2>

        <div class="item__form">

          <form class="form" action="#" method="POST" @submit.prevent="addToCart">

            <b class="item__price">

              {{product.price | numberFormat}} ₽

            </b>

            <fieldset class="form__block">

              <legend class="form__legend">Цвет:</legend>

              <ul class="colors">

                <li class="colors__item">

                  <label class="colors__label">

                    <input class="colors__radio sr-only" type="radio" name="color-item" value="blue" checked="">

                    <span class="colors__value" style="background-color: #73B6EA;">

                    </span>

                  </label>

                </li>

                <li class="colors__item">

                  <label class="colors__label">

                    <input class="colors__radio sr-only" type="radio" name="color-item" value="yellow">

                    <span class="colors__value" style="background-color: #FFBE15;">

                    </span>

                  </label>

                </li>

                <li class="colors__item">

                  <label class="colors__label">

                    <input class="colors__radio sr-only" type="radio" name="color-item" value="gray">

                    <span class="colors__value" style="background-color: #939393;">

                  </span></label>

                </li>

              </ul>

            </fieldset>

           <!--  <fieldset class="form__block">

              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">

                <li class="sizes__item">

                  <label class="sizes__label">

                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">

                    <span class="sizes__value">

                      32gb

                    </span>

                  </label>

                </li>

                <li class="sizes__item">

                  <label class="sizes__label">

                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">

                    <span class="sizes__value">

                      64gb

                    </span>

                  </label>

                </li>

                <li class="sizes__item">

                  <label class="sizes__label">

                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128" checked="">

                    <span class="sizes__value">

                      128gb

                    </span>

                  </label>

                </li>

              </ul>

            </fieldset>
 -->
            <div class="item__row">

              <button class="button button--primery" type="submit" :disabled="productAddSending">

                В корзину

              </button>

       <product-counter :counter.sync="productAmount"/>

            </div>

            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSending">Отправление товара в корзину</div>

          </form>

        </div>

      </div>

      <div class="item__desc">

        <ul class="tabs">

          <li class="tabs__item">

            <a class="tabs__link" href="#">

              Характеристики

            </a>

          </li>

        </ul>

        <div class="item__content">

          <p>

            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>

            Синхронизация со смартфоном<br>

            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>

            Поддержка сторонних приложений<br>

          </p>

          <p>

            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои

            велотренировки,сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS

            синхронизируется с датчиками по ANT+,

            объединяя полученную с них информацию. Данные отображаются на дисплее,

            а также сохраняются на смартфоне. При этом на мобильное устройство можно установить

            как фирменное приложение,ак и различные приложения сторонних разработчиков.

             Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников.

             Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.

          </p>

          <h3>Дизайн</h3>

          <p>

            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства

            составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона.

            Корпус гаджета выполнен из черного пластика. На обращенной к пользователю

            стороне расположен дисплей диагональю 56 мм. На дисплей выводятся

            координаты и скорость, а также полученная со смартфона и

            синхронизированных датчиков информация: интенсивность, скорость вращения педалей,

            пульс и т.д.

            (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень

            защиты от влаги IPX7. Это означает, что устройство не боится пыли,

            а также выдерживает кратковременное (до 30 минут) погружение в

            воду на глубину не более 1 метра.

          </p>

        </div>

      </div>

    </section>

  </main>

</template>

<script>

/* import products from '@/data/products';
import categories from '@/data/categories'; */
import axios from 'axios';
import { mapActions } from 'vuex';
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';
import productCounter from '@/components/productCounter.vue';
import { API_BASE_URL } from '../config';
// проксирование компонента из пакета Vuex

export default {
components: { productCounter },
data() {
  return {
    productAmount: 1,

    // Свойство для API(продукта)
    productData: null,
    // Загрузка данных
    productLoading: false,
    productLoadingFailed: false,

     // создание сообщении о добавлении товара
    productAddSending: false,

    // создание сообщении что товар добавлися
    productAdded: false,
  };
},
filters: {
 numberFormat,
},
computed: {
  // Возвращение информации о товаре и категории товара локально
 /*  product() {
return products.find((product) => product.id === +this.$route.params.id);
  },
  category() {
    return categories.find((category) => category.id === this.product.categoryId);
  }, */

  // Возвращение информации о товаре и категории товара с API
  product() {
return this.productData;
  },
  category() {
    return this.productData.category;
  },
     // вывод изображения товара с API
        products() {
        return this.productsData ? this.productsData.items.map((product) => ({
            ...product,
            image: product.image.file.url,
          }))
        : [];
      },
},
methods: {
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
 // отслеживание динамического сегмнта для измения адреса страниц
     watch: {
        '$route.params.id': {
          handler() {
            this.loadProduct();
          },
          immediate: true,
        },
     },
};
</script>

<style lang="scss">

/* MEDIA QUERIES*/
 @media (max-width: 1199px) {
   .item__title {
    font-size: 30px;
}
 .item__price {
    font-size: 30px;
}
 }
/* md-размер (<=991px) */
  @media (max-width: 991px) {
   .item__title {
    font-size: 20px;
}
 .item__price {
    font-size: 20px;
}

.item__form {
    padding: 30px;
}

 .item__row {
    display: grid;
    grid-template-columns: 150px 24px;
    grid-gap: 15px;
}

.form__counter {
    width: 145px;
}
}

/* sm-размер (<=768px) */
@media (max-width: 767px) {

}

/* xs-размер (<=575px) */
@media (max-width: 575px) {

   .item {
    display: grid;
    grid-template-columns: repeat(1,1fr);
    grid-gap: 55px 30px;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
}

   .item__title {
   text-align: center;
}

   .item__price {
   text-align: center;
}

.colors {
    justify-content: center;
}
  .item__row {
    margin-left: 10%;
}
}

</style>
