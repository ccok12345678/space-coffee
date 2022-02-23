<template lang="pug">
.container-lg.d-flex.justify-content-center.py-5.w-100.bg-cover.mb-2(
  :style="`background-image:url(${newArrival.imageUrl})`"
  v-if="newArrival.imageUrl")
  .banner-head.p-sm-4.p-0
    p.text-gray-200.mb-1.pt-3.pt-md-1
      | 土星環精品，腦海迷航必備：

    .devider.my-2

    .d-none.d-md-flex
      p.fs-3.mb-1.mb-md-2.text-light
        | 『{{ newArrival.title }}』
      p.fs-3.text-light
        | 💫少量到貨！
    .d-flex.flex-column.d-md-none
      p.fs-5.mb-1.mb-md-2.text-light
        | 『{{ newArrival.title }}』
      p.fs-5.text-light
        | 💫少量到貨！

    router-link.btn.btn-outline-cyan-400.border-0(
      :to="`/product/${newArrival.id}`") 瞭解更多

    span.text-light.mx-1 或

    a.btn.btn-outline-cyan-400.border-0(href="#"
      @click.prevent="addCart(newArrival)") 直接放進購物車！

.container-lg.d-flex.justify-content-center.py-5.w-100.bg-cover(
  :style="`background-image:url(${special.imageUrl})`"
  v-if="special.imageUrl")

  .banner-head.p-sm-4.p-0
    p.text-gray-200.mb-1.pt-3.pt-md-1
      | 太陽系最佳配方豆，本店誠意之作：

    .devider.my-2.border-danger

    .d-none.d-md-flex
      p.fs-3.mb-1.mb-md-2.text-light
        | 宇宙特調 『{{ special.title }}』

    .d-flex.flex-column.d-md-none
      p.fs-5.mb-1.mb-md-2.text-light
        | 宇宙特調 『{{ special.title }}』

    router-link.btn.btn-outline-cyan-400.border-0(
      :to="`/product/${special.id}`") 瞭解更多
    span.text-light.mx-1 或
    a.btn.btn-outline-cyan-400.border-0(href="#"
      @click.prevent="addCart(special)") 直接放進購物車！

main.text-cyan-600.text-center.fs-5.font-monospace.my-4
  p 一個人很好，
  p 有咖啡喝，更好。

.banner.w-100.bg-cover.p-5.text-center.mb-2
  .p-5.my-5.display-1.text-light.text-brand.d-none.d-md-block
    | Coffee Or Die
  .p-4.my-5.display-3.text-light.text-brand.d-md-none
    | Coffee Or Die
</template>

<script>
export default {
  data() {
    return {
      newArrival: {},
      special: {},
    };
  },
  inject: ['emitter', 'pushToast'],
  methods: {
    async getProduct(id) {
      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}
      `;

      const http = await fetch(api);
      const fetchData = await http.json();
      const tempProduct = await fetchData.product;

      return tempProduct;
    },

    async addCart(item) {
      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart
      `;
      const product = { data: { product_id: item.id, qty: 1 } };
      try {
        const http = await fetch(api, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
        const fetchData = await http.json();

        this.pushToast(fetchData, item.title);
        this.emitter.emit('add-cart', 1);
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    try {
      this.newArrival = await this.getProduct('-MsZI3bMFPOKFwOi1_Jj');
      this.special = await this.getProduct('-MsZJr16FHvslJoxeAis');
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.banner {
  background-image: url('../../assets/photos/banner-background.jpg');
}
.banner-head {
  background: rgba(0, 0, 0, .5);
  width: 75%;

  @media (max-width: 767.98px) {
    width: 90%
  }
  @media (max-width: 575.98px) {
    width: 100%
  }
}
</style>
