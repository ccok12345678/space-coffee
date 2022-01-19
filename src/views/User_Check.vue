<template lang="pug">

</template>

<script>
export default {
  data() {
    return {
      orderId: '',
      order: {},
    };
  },
  methods: {
    async getOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      const http = await fetch(api);
      const data = await http.json();

      if (data.success) {
        this.order = data.order;
        console.log('check', this.order);
      }
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
  mounted() {
    document.title = '訂單付款｜宇宙咖啡';
  },
};
</script>
