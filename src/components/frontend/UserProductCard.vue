<template lang="pug">
a.item-box.text-light.text-decoration-none.text-nowrap.border.p-0(
  href="#"
  @click.prevent="goProduct" :disabled="status === tempPick.id"
  )

  img.item-box-background(
    :src="tempPick.imageUrl"
    :title="tempPick.title"
    :alt="tempPick.title")

  .item-box-caption.py-2.w-100.pt-4.text-center.vstack
    span {{ tempPick.category }}：
    span {{ tempPick.title }}
    span NT$ {{ $filters.currency(tempPick.price) }} / {{ tempPick.unit }}

    button.btn.btn-outline-light.px-3.mt-1.mx-auto(type="button"
      @click.prevent.stop="addCart(tempPick.id)"
      :disabled="status === tempPick.id")

      .spinner-border.spinner-border-sm(v-if="status === tempPick.id")
        .visually-hidden Loading...
      span(v-else) 購買

</template>

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
  inject: ['pushToast', 'emitter'],
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

      const qty = 1;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const product = { data: { product_id: id, qty } };

      const http = await fetch(api, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const data = await http.json();

      this.pushToast(data, this.tempPick.title);
      this.emitter.emit('add-cart', qty);
      this.status = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.item-box {
  display: flex;
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;

  &-caption {
    background: rgba(0, 0, 0, 0.5);
    transition: .3s ease;
    transform: translateY(50px);
    z-index: 2;

    @media (min-width: 768px) {
      transform: translateY(50px);
    }
  }

  &-background {
    position: absolute;
    top: 50%; left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
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
