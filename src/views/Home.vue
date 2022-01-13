<template lang="pug">
UserNavbar(:areas="categories")
.box
</template>

<style lang="scss" scoped>
.box {
  width: 200px;
  height: 300px;
}
</style>

<script>
import UserNavbar from '@/components/User_Navbar.vue';

export default {
  name: 'Home',
  components: {
    UserNavbar,
  },
  data() {
    return {
      products: [],
      categories: [],
      isLoading: false,
    };
  },
  methods: {
    async getProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      const http = await fetch(api);
      const data = await http.json();

      this.isLoading = false;
      return data;
    },
    async sortProducts() {
      const data = await this.getProducts();
      this.products = data.products;

      this.products.forEach((item) => {
        if (!this.categories.includes(item.category)) {
          this.categories.push(item.category);
        }
      });
      console.log(this.categories);
    },
  },
  created() {
    this.sortProducts();
  },
  mounted() {
    document.title = '宇宙咖啡 Space Coffee | 瀰漫星際的咖啡香';
  },
};
</script>
