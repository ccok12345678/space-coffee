<template lang="pug">
.container-lg.my-4.text-nowrap
  .w-100.text-center.text-gray-600(v-if="!carts.carts")
    img.cart-img.w-25(src="../assets/images/alien_ship.svg")
    h5 購物車是空的，快去選購吧！
  .row.justify-content-center(v-if="!!carts.carts")
    .col-md-10
      .row.gx-2.gy-2
        .col-12.d-flex
          h4.text-gray-700.mx-auto 購物車清單
          button.btn.hover-red.px-3.mx-2(
              type="button" title="清空購物車"
              @click.prevent="deleteCart")
            i.bi.bi-trash-fill
        template(v-for="(item, key) in carts.carts" :key="item.id")
          .col-1.text-start.fs-5.d-flex.align-items-center
            | {{key + 1 }} /
          .col-11.col-md-4.text-start.d-flex.align-items-center
            | {{ item.product.title }}
          .col-5.col-md-2.d-flex.flex-md-column.align-items-center.align-items-md-start
            small 數量：
            .input-group.input-group-sm
              input.form-control.form-control-sm(type="number" min="1" step="1"
                v-model="item.qty" @change="updateCart(item.id, item.qty)"
                :disabled="status === item.id")
              .input-group-text.border-0.bg-transparent
                | x{{ item.product.unit }}
          .col-2.col-md-2.d-flex.align-items-end.flex-column
            small 單價：
            div NT$ {{ $filters.currency(item.product.price) }}
          .col-3.col-md-2.d-flex.align-items-end.flex-column(
            :class="{ 'text-success': 'coupon' in item }")
            small 優惠價：
            | NT$ {{ $filters.currency(item.final_total) }}
          .col-2.col-md-1.d-flex.align-items-center
            button.btn.hover-red.px-1.d-block.w-100(
              type="button" title="刪除"
              @click.prevent="deleteCart(false, item.id)")
                  i.bi.bi-trash
          .devider.w-100.border-secondary
      .row.justify-content-md-end.justify-content-center
        .col-4.d-flex.mt-3
          .my-auto.ms-auto 總計：
        .col-8.col-md-5.d-flex.mt-3
          .my-auto.ms-auto.text-end
            .text-muted.text-decoration-line-through(
              v-if="carts.total > carts.final_total")
              | NT$ {{ $filters.currency(carts.total) }}#[br]
            .fw-bold
              | NT$ {{ $filters.currency(carts.final_total) }}#[br]
              small.text-success.fw-normal(v-if="carts.total > carts.final_total") 已使用優惠卷
        .devider.w-75.my-3.border-secondary
        .col-4.d-flex
          .my-auto.ms-auto 使用優惠卷：
        .col-8.col-md-5.d-flex
          form.hstack.ms-auto.my-auto(@submit.prevent="addCoupon")
              input.form-control.form-control-sm.w-75.me-2(type="text"
                placeholder="E-Coupon" v-model="coupon")
              button.btn.btn-sm.btn-outline-dark.w-25(type="submit") 套用
        .devider.w-75.my-3.border-secondary
      .text-center.text-md-end
        button.btn.btn-cyan-600.text-light.w-30(type="button"
          @click.prevent="$router.push('/order')")
          | 前往付款
          i.bi.bi-box-arrow-right.ms-2
</template>

<style lang="scss" scoped>
.cart-img {
  animation: updown 1.5s infinite alternate ease-in-out;
}
@keyframes updown {
  0% {
    margin-bottom: 0px;
    margin-top: 40px;
  }
  100% {
    margin-bottom: 40px;
    margin-top: 0;
  }
}
.banner {
  height: 130px;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-40%);
  }
}
</style>

<script>
export default {
  data() {
    return {
      carts: {},
      coupon: '',
      status: '',
    };
  },
  inject: ['pushToast'],
  methods: {
    async getCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const http = await fetch(api);
      const data = await http.json();

      this.carts = data.data;
      console.log('carts', this.carts);
    },
    async deleteCart(isAll = true, id) {
      let api;
      if (isAll) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      } else {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      }
      const http = await fetch(api, { method: 'delete' });
      const data = await http.json();
      console.log('delete cart', data);

      this.pushToast(data, '購物車');
      this.getCart();
    },
    async addCoupon() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      const couponData = { data: { code: this.coupon } };

      const http = await fetch(api, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(couponData),
      });
      const data = await http.json();

      this.coupon = '';
      this.pushToast(data, '優惠卷');
      this.getCart();
      console.log('coupon', data);
    },
    async updateCart(id, qty) {
      this.status = id;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      const cartData = {
        data: {
          product_id: id,
          qty,
        },
      };

      const http = await fetch(api, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData),
      });
      const data = await http.json();

      this.pushToast(data, '購物車');
      this.getCart();
      this.status = '';
    },
  },
  created() {
    this.getCart();
    document.title = '購物車 | 宇宙咖啡';
  },
};
</script>
