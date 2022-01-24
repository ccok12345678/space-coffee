<template lang="pug">
.container-lg.d-flex.flex-column.align-items-center.my-5

  h3.fs-4.text-gray-600 {{ classing }}

  .devider.w-50.border-gray-500.mb-5

  .row.d-flex.justify-content-center.w-100
    .col-md-11

      .row.gy-4.d-flex.justify-content-center

        .col-md-3.text-center(v-if="isLoading")
          img.img-fluid(src="../assets/images/ufo-svgrepo.svg")
          p.fs-5.text-gray-600.mt-3 就快到了！

        .col-md-4.col-sm-6(v-for="item of tempProducts" :key="item.id")
          UserProductCard(:tempPick="item")
</template>

<script>
import UserProductCard from '@/components/User_ProductCard.vue';

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
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      const http = await fetch(api);
      const data = await http.json();

      this.isLoading = false;
      return data.products;
    },
    classifyProducts() {
      this.tempProducts = [];
      const roast = new RegExp(this.classing);

      this.products.forEach((item) => {
        if (item.category === this.classing) {
          this.tempProducts.push(item);
        } else if (roast.test(item.title)) {
          this.tempProducts.push(item);
        }
      });
    },
  },
  created() {
    document.title = `${this.classing} | 宇宙咖啡`;
    this.classing = this.$route.params.classing;
    this.getProducts()
      .then((data) => {
        this.products = data;
        this.classifyProducts();
      });
  },
  watch: {
    $route() {
      this.classing = this.$route.params.classing;
      this.classifyProducts();
      document.title = `${this.classing} | 宇宙咖啡`;
    },
  },
};
</script>
