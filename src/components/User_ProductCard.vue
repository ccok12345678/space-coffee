<template lang="pug">
button.item-box.bg-cover.text-light.text-decoration-none.border.p-0(
  :style="`background-image: url(${tempPick.imageUrl}};`"
  @click.prevent="goProduct" :disabled="status === tempPick.id"
  )
  .item-box-caption.py-2.w-100.pt-4.text-center.vstack
    span {{ tempPick.category }}：
    span {{ tempPick.title }}
    span $ {{ $filters.currency(tempPick.price) }} / {{ tempPick.unit }}
    button.btn.btn-outline-light.w-25.mt-1.mx-auto(type="button"
      @click.prevent.stop="addCart(tempPick.id)"
      :disabled="status === tempPick.id")
      .spinner-border.spinner-border-sm(v-if="status === tempPick.id")
        .visually-hidden Loading...
      span(v-else) 購買
</template>

<style lang="scss" scoped>
.item-box {
  display: flex;
  width: 100%;
  height: 250px;
  overflow: hidden;

  &-caption {
    background: rgba(0, 0, 0, 0.5);
    transition: .3s ease;
    transform: translateY(100px);

    @media (min-width: 768px) {
      transform: translateY(250px);
    }
  }
}
.item-box:hover  {
    .item-box-caption {
      backdrop-filter: blur(3px);

      @media (min-width: 576px) {
        transform: translateY(100px);
      }
    }
  }
</style>

<script>
export default {
  data() {
    return {
      status: '',
    };
  },
  props: {
    tempPick: {
      type: Object,
      default() { return {}; },
    },
  },
  inject: ['pushToast'],
  methods: {
    goProduct() {
      this.$router.push(`/product/${this.tempPick.id}`);
      window.scroll({
        top: 100,
        behavior: 'smooth',
      });
    },
    async addCart(id) {
      this.status = id;

      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const product = { data: { product_id: id, qty: 1 } };
      const http = await fetch(api, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const data = await http.json();

      this.pushToast(data, this.tempPick.title);
      this.status = '';
    },
  },
};
</script>
