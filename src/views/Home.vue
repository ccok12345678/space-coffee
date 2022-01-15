<template lang="pug">
UserNavbar(:areas="categories" :products="products")

UserFrontPage(:products="products"
  v-if="$route.name === 'Home'")

router-view

UserFooter
</template>

<style lang="scss" scoped>
.box {
  width: 200px;
  height: 600px;
}

</style>

<script>
import UserNavbar from '@/components/User_Navbar.vue';
import UserFooter from '@/components/User_Footer.vue';
import UserFrontPage from '@/components/User_FrontPage.vue';

export default {
  name: 'Home',
  components: {
    UserNavbar,
    UserFooter,
    UserFrontPage,
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
      return data.products;
    },
    async sortProducts() {
      const data = await this.getProducts();
      this.products = data;

      this.products.forEach((item) => {
        if (!this.categories.includes(item.category)) {
          this.categories.push(item.category);
        }
      });
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
