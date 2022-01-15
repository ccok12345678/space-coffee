<template lang="pug">
.ll 買咖啡
h2 {{ classing }}
div {{ tempProducts }}
</template>

<script>
export default {
  data() {
    return {
      classing: '',
      products: [],
      tempProducts: [],
    };
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
      console.log('sorted', this.tempProducts);
    },
  },
  created() {
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
    },
  },
};
</script>
