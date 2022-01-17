<template lang="pug">
.btn-group-vertical.btn-fixed
  button.btn.btn-secondary.text-light.border-0.p-2.px-3.mb-1(
    title="購物車" class="hover-half-transparent-cyan"
    @click.prevent="goCart" type="button"
  )
    span.badge.position-absolute.top-1.start-100.translate-middle.rounded-pill.bg-warning(
      v-if="goodsNum > 0")
      | {{ goodsNum }}
    i.bi.bi-cart3
  button.btn.btn-secondary.hover-half-transparent-cyan.text-light.border-0.p-2.px-3(
    title="回到頂端" @click.prevent="scrollTop" type="button"
  )
    i.bi.bi-arrow-up-circle
</template>

<style lang="scss" scoped>
.badge {
  opacity: .7;
}
button[title="購物車"]:hover {
  .badge {
  opacity: 1;
  }
}
</style>

<script>
export default {
  data() {
    return {
      cart: [],
      goodsNum: 0,
    };
  },
  inject: ['emitter'],
  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    goCart() {
      console.log('GO CART!!');
    },
    async getCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const http = await fetch(api);
      const data = await http.json();
      const nums = [];

      data.data.carts.forEach((item) => {
        nums.push(item.qty);
      });
      this.goodsNum = nums.reduce((x, i) => x + i);
    },
  },
  created() {
    this.getCart();
  },
  mounted() {
    // update goods number
    this.emitter.on('add-cart', (qty) => {
      const num = this.goodsNum;
      this.goodsNum = num + qty;
    });
  },
};
</script>
