<template lang="pug">
//- show if empty
.container-lg.d-flex.flex-column.align-items-center.my-5(v-if="!favorites.length")
  img.favor-img.w-25(src="../assets/images/ufo-svgrepo-com.svg")
  h3.fs-4.text-gray-600.mt-3 還沒有收藏，先去逛逛吧！

.container-lg.d-flex.flex-column.align-items-center.my-5(v-if="!!favorites.length")

  .d-flex
    h3.fs-4.text-gray-600 收藏清單

    //- delete button
    button.btn.btn-sm.hover-red.px-2.mb-2.ms-2(
    type="button" title="清空收藏清單"
    @click.prevent="deleteFavors")
      i.bi.bi-trash-fill

  .devider.w-50.border-gray-500.mb-5

  .row.d-flex.justify-content-center.w-100

    .col-md-11
      .row.gy-4.d-flex.justify-content-center

        .col-md-4.col-sm-6(v-for="item of favorites" :key="item.id")
          UserProductCard(:tempPick="item")

</template>

<style lang="scss" scoped>
.favor-img {
  animation: swing 5s ease-in infinite;
}
@keyframes swing {
  0% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(100px) rotate(30deg);
  }
  80% {
    transform: translateX(-100px) rotate(-20deg);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

<script>
import UserProductCard from '@/components/User_ProductCard.vue';

export default {
  data() {
    return {
      products: [],
      favorites: [],
      key: 'space-coffee-favorites',
    };
  },
  components: {
    UserProductCard,
  },
  methods: {
    async getProducts() {
      this.isLoading = true;
      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all
      `;
      const http = await fetch(api);
      const fetchData = await http.json();

      this.isLoading = false;
      return fetchData.products;
    },

    collectFavorites() {
      let favorites = localStorage.getItem(this.key);

      if (favorites) {
        favorites = JSON.parse(favorites);

        this.products.forEach((product) => {
          favorites.forEach((favor) => {
            if (product.id === favor.id) {
              this.favorites.push(product);
            }
          });
        });
      }
    },

    deleteFavors() {
      localStorage.setItem(this.key, '');
      this.favorites = [];
    },
  },
  async created() {
    document.title = '收藏清單 | 宇宙咖啡';
    this.products = await this.getProducts();
    this.collectFavorites();
  },
};
</script>
