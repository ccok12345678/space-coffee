<template lang="pug">
.btn-group-vertical.btn-fixed

  button.btn.btn-secondary.text-light.border-0.p-2.px-3.mb-1(
    title="購物車" class="hover-half-transparent-cyan"
    @click.prevent="goCart" type="button"
    v-if="isCart"
  )
    span.badge.position-absolute.top-1.start-100.translate-middle.rounded-pill.bg-warning(
      v-if="goodsNum > 0")
      | {{ goodsNum }}
    i.bi.bi-cart3

  button.btn.btn-secondary.hover-half-transparent-cyan.text-light.border-0.p-2.px-3(
    title="回到頂端" @click.prevent="scrollTop" type="button"
    v-if="isShowScrollBtn"
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
