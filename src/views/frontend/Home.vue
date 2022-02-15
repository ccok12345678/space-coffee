<template lang="pug">
UserNavbar(:areas="categories" :products="products")

UserFrontPage(:products="products"
  v-if="$route.name === 'Home'")

router-view

UserFixedBtn

UserFooter

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
};
</script>
