<template lang="pug">
h2 here here
div {{ tempProduct }}
</template>

<script>
export default {
  data() {
    return {
      tempProduct: {},
    };
  },
  methods: {
    async getProduct() {
      const { id } = this.$route.params;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      const http = await fetch(api);
      const data = await http.json();
      this.tempProduct = data;
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
