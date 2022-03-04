<template lang="pug">
.container-lg.my-5.text-gray-600

  .row.justify-content-center

    section.col-lg-7.d-flex.justify-content-center.order-2.order-lg-1
      main.card.border-0.rounded-0

        .card-img
          img.card-img-top.rounded-0(:src="tempProduct.imageUrl" :alt="tempProduct.content"
          :title="tempProduct.title")

        h3.card-title.mx-auto.mt-4.d-block.d-lg-none {{ tempProduct.title }}

        //- show in md & smaller browser width
        .mx-auto.text-center.d-block.d-lg-none.my-3

          .text-gray-300.text-decoration-line-through
            | 原價：{{ $filters.currency(tempProduct.origin_price) }}元 / {{ tempProduct.unit }}
          .text-cyan-600.fs-5
            | 特價：{{ $filters.currency(tempProduct.price) }}元 / {{ tempProduct.unit }}

          .input-group.input-group-sm.w-50.mt-2.mx-auto
            span.input-group-text.text-gray-600.bg-white.border-0 數量：
            input.form-control.rounded(type="number" min="1" step="1" name="qty"
            v-model="qty")

          button.btn.btn-cyan-600.text-light.w-75.my-2(type="button"
            @click.stop="addCart(tempProduct.id)"
            :disabled="status === tempProduct.id")
            .spinner-border.spinner-border-sm.mx-4(v-if="status === tempProduct.id")
              .visually-hidden Loading...
            span(v-else) 加入購物車

          button.btn.w-75(type="button"
            @click="updateFavorite(tempProduct.id)"
            title="點擊以加入/取消收藏"
            :class="{ 'btn-outline-success': isFavorite, 'btn-outline-gray-600': !isFavorite }")
            span(v-if="isFavorite")
              i.bi.bi-check-lg.me-1
              | 已收藏
            span(v-else) 加入收藏

        .card-body.px-3.px-md-5

          .d-block.d-lg-none.d-flex.flex-column
            .divider.w-50.mx-auto.mb-4.border-gray-500
            h6.mb-2.mx-auto 風味描述
            p.mb-0 {{ tempProduct.description }}

          .pt-5
            p.card-text.fw-light.lh-lg.pt-4
              strong.mx-auto 產地：{{ tempProduct.category }}#[br]
              | {{ tempProduct.content }}

            .divider.w-50.mx-auto.my-4.border-gray-500

            .d-flex.justify-content-around.mt-2.d-block.d-lg-none
              img.mx-auto(src="@/assets/images/aeropress_coffee.svg" width="50"
                title="good for aeropress" alt="aeropress")
              img.mx-auto(src="@/assets/images/french_press.svg" width="50"
                title="good for french press" alt="french press")
              img.mx-auto(src="@/assets/images/portafilter_tamper_icon.svg" width="50"
                title="good for espresso" alt="espresso")

            .divider.w-50.mx-auto.my-4.border-gray-500.d-block.d-lg-none

        //- coffee recipe
        CoffeeRecipe

        //- relative products
        RelativeProducts(:product="tempProduct")

    //- show in bigger browser width
    .col-lg-4.order-1.order-lg-2.d-none.d-lg-block

      aside.d-flex.flex-column.sticky-top.pt-3

        h5.mx-auto {{ tempProduct.title }}

        .divider.w-25.mx-auto.my-4.border-gray-500

        .d-flex.justify-content-around.mt-2
          img.mx-auto(src="@/assets/images/aeropress_coffee.svg" width="50"
            title="good for aeropress" alt="aeropress")
          img.mx-auto(src="@/assets/images/french_press.svg" width="50"
            title="good for french press" alt="french press")
          img.mx-auto(src="@/assets/images/portafilter_tamper_icon.svg" width="50"
            title="good for espresso" alt="espresso")

        .divider.w-25.mx-auto.my-4.border-gray-500

        .mx-auto.d-flex.flex-column.align-items-center

          .text-gray-300.text-decoration-line-through
            | 原價：{{ $filters.currency(tempProduct.origin_price) }}元 / {{ tempProduct.unit }}
          .text-cyan-600.fs-5
            | 特價：{{ $filters.currency(tempProduct.price) }}元 / {{ tempProduct.unit }}

          .input-group.input-group-sm.w-50.mt-2
            span.input-group-text.text-gray-600.bg-white.border-0 數量：
            input.form-control.rounded(type="number" min="1" step="1" name="qty"
            v-model="qty")

          button.btn.btn-cyan-600.text-light.w-75.my-2(type="button"
            @click.stop="addCart(tempProduct.id)"
            :disabled="status === tempProduct.id")
            .spinner-border.spinner-border-sm.mx-4(v-if="status === tempProduct.id")
              .visually-hidden Loading...
            span(v-else) 加入購物車

          button.btn.w-75(type="button"
            @click="updateFavorite(tempProduct.id)"
            title="點擊以加入/取消收藏"
            :class="{ 'btn-outline-success': isFavorite, 'btn-outline-gray-600': !isFavorite }")
            span(v-if="isFavorite")
              i.bi.bi-check-lg.me-1
              | 已收藏
            span(v-else) 加入收藏

        .divider.w-25.mx-auto.my-4.border-gray-500

        h6.mb-1.mx-auto 風味描述
        p.mb-0.w-75.mx-auto {{ tempProduct.description }}

</template>

<script>
import { useMeta } from 'vue-meta';
import scrollTop from '@/methods/scrollTop';
import CoffeeRecipe from '@/components/frontend/CoffeeRecipe.vue';
import RelativeProducts from '@/components/frontend/RelativeProducts.vue';

export default {
  data() {
    return {
      tempProduct: {},
      qty: 1,
      status: '',
      key: 'space-coffee-favorites',
      favorites: [],
      isFavorite: false,
    };
  },
  components: {
    CoffeeRecipe,
    RelativeProducts,
  },
  inject: ['pushToast', 'emitter'],
  watch: {
    async $route() {
      await this.getProduct();
      if (this.tempProduct !== undefined) {
        document.title = this.tempProduct.title;
      }
      scrollTop();
    },
  },
  methods: {
    async getProduct() {
      const { id } = this.$route.params;
      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}
      `;

      try {
        const http = await fetch(api);
        const fetchData = await http.json();
        this.tempProduct = await fetchData.product;
      } catch (error) {
        console.error(error);
      }
    },

    async addCart(id) {
      this.status = id;

      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart
      `;
      const product = { data: { product_id: id, qty: this.qty } };
      try {
        const http = await fetch(api, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
        const fetchData = await http.json();

        this.pushToast(fetchData, this.tempProduct.title);
        this.emitter.emit('add-cart', this.qty);
        this.qty = 1;
        this.status = '';
      } catch (error) {
        console.error(error);
      }
    },

    getFavorites() {
      const favorites = localStorage.getItem(this.key);

      if (favorites) {
        this.favorites = JSON.parse(favorites);
      }
    },

    isInFavorites() {
      const favorites = this.favorites.map((item) => item.id);
      return favorites.includes(this.tempProduct.id);
    },

    updateFavorite(id) {
      if (this.isFavorite) {
        // remove from favorites
        this.favorites = this.favorites.filter((item) => item.id !== id);
        localStorage.setItem(this.key, JSON.stringify(this.favorites));
      } else {
        // add to favorites
        const favorite = { id };
        this.favorites.push(favorite);
        localStorage.setItem(this.key, JSON.stringify(this.favorites));
      }

      this.getFavorites();
      this.isFavorite = this.isInFavorites();
    },
  },
  async created() {
    try {
      await this.getProduct();
    } catch (error) {
      console.error(error);
    }

    this.getFavorites();
    this.isFavorite = this.isInFavorites();
  },
  updated() {
    useMeta({
      title: this.tempProduct.title,
    });
  },
};
</script>

<style lang="scss" scoped>
.card {
  max-width: 500px;
}

.card-text {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: -28px;
    padding-top: 40px;
    background: url('../../assets/images/barista_coffee.svg') no-repeat center;
  }
}

.card-img {
  overflow: hidden;
  width: 100%;
  height: 400px;
  position: relative;

  @media (max-width: 576px) {
    height: 300px;
  }

  &-top {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
