<template lang="pug">
UserNavbar(:areas="categories" :products="products")

.wrap
  UserFrontPage(:products="products"
    v-if="$route.name === 'Home'")
  router-view

UserFooter

UserFixedBtn

ToastMessages

</template>

<script>
import UserNavbar from '@/components/frontend/UserNavbar.vue';
import UserFooter from '@/components/frontend/UserFooter.vue';
import UserFrontPage from '@/components/frontend/UserFrontPage.vue';
import UserFixedBtn from '@/components/frontend/UserFixedBtn.vue';
import ToastMessages from '@/components/ToastMessages.vue';

import emitter from '@/methods/emitter';
import scrollTop from '@/methods/scrollTop';
import pushToast from '@/methods/pushToast';

export default {
  name: 'Home',
  components: {
    UserNavbar,
    UserFooter,
    UserFrontPage,
    UserFixedBtn,
    ToastMessages,
  },
  provide() {
    return {
      pushToast,
      emitter,
      scrollTop,
    };
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

      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all
      `;
      let data;

      try {
        const http = await fetch(api);
        data = await http.json();
      } catch (error) {
        console.error(error);
      }

      this.isLoading = false;
      return data.products;
    },

    async sortProducts() {
      try {
        const data = await this.getProducts();
        this.products = data;
        this.products.forEach((item) => {
          if (!this.categories.includes(item.category)) {
            this.categories.push(item.category);
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.sortProducts();
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  //  - footer height
  min-height: calc(100vh - 317px);
}
</style>
