<template lang="pug">
.btn-group-vertical.btn-fixed

  button.btn.btn-warning.text-light.border-0.p-2.px-3.mb-1.hover-half-transparent-orange(
    type="button"
    title="購物車"
    @click="goCart"
    v-if="isCart"
  )
    span.badge.position-absolute.top-1.start-100.translate-middle.rounded-pill.bg-cyan-400(
      v-if="goodsNum > 0")
      | {{ goodsNum }}
    i.fs-4.bi.bi-cart3

  button.btn.btn-secondary.hover-half-transparent-cyan.text-light.border-0.p-2.px-3(
    type="button"
    title="回到頂端"
    @click="scrollTop"
    v-if="isShowScrollBtn"
  )
    i.fs-4.bi.bi-arrow-up-circle
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      goodsNum: 0,
      isCart: true,
      isShowScrollBtn: false,
    };
  },
  inject: ['emitter', 'scrollTop'],
  methods: {
    scrollUp() {
      this.scrollTop();
    },

    goCart() {
      this.scrollTop();
      this.$router.push({ name: 'Cart' });
    },

    async getCart() {
      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart
      `;
      const http = await fetch(api);
      const data = await http.json();

      if (data.data.carts.length === 0) {
        this.goodsNum = 0;
      } else {
        const nums = data.data.carts.map((item) => item.qty);
        this.goodsNum = nums.reduce((x, i) => x + i);
      }
    },

    showCartBtn() {
      switch (this.$route.name) {
        case 'Cart':
          this.isCart = false;
          break;
        case 'Order':
          this.isCart = false;
          break;
        case 'Check':
          this.isCart = false;
          break;
        default:
          this.isCart = true;
          break;
      }
    },

    showScrollBtn() {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
          this.isShowScrollBtn = true;
        } else {
          this.isShowScrollBtn = false;
        }
      });
    },
  },
  watch: {
    $route() {
      this.showCartBtn();
    },
  },
  updated() {
    this.getCart();
  },
  created() {
    this.getCart();
    this.showCartBtn();
  },
  mounted() {
    // update goods number
    this.emitter.on('add-cart', (qty) => {
      const num = this.goodsNum;
      this.goodsNum = num + qty;
    });

    // scroll btn
    this.showScrollBtn();
  },
};
</script>

<style lang="scss" scoped>
.btn-group-vertical {
  z-index: 4;
}
.badge {
  opacity: .7;
}
button[title="購物車"]:hover {
  .badge {
  opacity: 1;
  }
}
</style>
