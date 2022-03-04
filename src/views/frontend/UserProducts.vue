<template lang="pug">
.container-lg.d-flex.flex-column.align-items-center.my-5

  h3.fs-4.text-gray-600 {{ classing }}

  .divider.w-50.border-gray-500.mb-5

  .row.d-flex.justify-content-center.w-100
    .col-md-11

      .row.gy-4.d-flex.justify-content-center

        .col-md-3.text-center(v-if="isLoading")
          img.img-fluid(src="@/assets/images/ufo-svgrepo.svg" alt="almost there!")
          p.fs-5.text-gray-600.mt-3 就快到了！

        .col-md-4.col-sm-6(v-for="item of tempProducts" :key="item.id")
          UserProductCard(:tempPick="item")
</template>

<script>
import { useMeta } from 'vue-meta';
import UserProductCard from '@/components/frontend/UserProductCard.vue';

export default {
  data() {
    return {
      classing: '',
      products: [],
      tempProducts: [],
      isLoading: false,
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
      let fetchData;

      try {
        const http = await fetch(api);
        fetchData = await http.json();
      } catch (error) {
        console.error(error);
      }

      this.isLoading = false;

      return fetchData.products;
    },

    classifyProducts() {
      this.tempProducts = [];

      const roast = new RegExp(this.classing);

      this.tempProducts = this.products
        .filter((product) => (product.category === this.classing)
          || roast.test(product.title));
    },
  },
  async created() {
    this.classing = this.$route.params.classing;

    try {
      this.products = await this.getProducts();
      this.classifyProducts();
    } catch (error) {
      console.error(error);
    }
  },
  watch: {
    $route() {
      this.classing = this.$route.params.classing;
      this.classifyProducts();
      document.title = `${this.classing} | 宇宙咖啡 Space Coffee`;
    },
  },
  updated() {
    useMeta({
      title: this.classing,
    });
  },
};
</script>
