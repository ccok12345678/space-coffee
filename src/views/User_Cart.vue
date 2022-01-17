<template lang="pug">
.container-lg.my-4
  .row.justify-content-center
    .col-md-10.overflow-auto
      main.w-100.text-nowrap.d-flex.flex-column
        img.cart-img.w-25.align-self-center(src="../assets/images/alien_ship.svg"
          v-if="!carts.carts")
        .banner
          img.img-fluid(src="https://images.unsplash.com/photo-1601892782633-675465fa7f3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80")
        table.table.table-striped.table-hover.align-middle.mt-4
          thead
            legend.text-center.border.mx-auto 購物車
            tr.text-end
              th.text-center 商品名稱
              th.textcenter(width="70") 數量
              th 單位
              th 單價
              th 小計
              th.text-center
                | 刪除
                button.border-0.hover-red.px-2(type="button" title="清空購物車"
                  @click.prevent="deleteCart")
                  i.bi.bi-trash-fill
          tbody
            tr.text-end(v-for="item in carts.carts" :key="item.id")
              td.text-start {{ item.product.title }}
              td
                input.form-control.form-control-sm(type="number" min="1" step="1"
                  v-model="item.qty")
              td {{ item.product.unit }}
              td NT$ {{ $filters.currency(item.product.price) }}
              td NT$ {{ $filters.currency(item.final_total) }}
              td
                button.border-0.hover-red.py-2.px-2.d-block.mx-auto.w-50(type="button" title="刪除"
                  @click.prevent="deleteCart(false, item.id)")
                  i.bi.bi-trash
          tfoot.text-end
            tr
              td(colspan="4") 總計：
              td.fw-bold(colspan="2") NT$ {{ $filters.currency(carts.final_total) }}
            tr
              td(colspan="3") 使用優惠卷:
              td(colspan="3")
                form.hstack(@submit.prevent="addCoupon")
                  input.form-control.form-control-sm.me-2(type="text"
                    placeholder="E-Coupon" v-model="coupon")
                  button.btn.btn-sm.btn-outline-dark(type="submit") 套用
        .text-end
          button.btn.btn-cyan-600.text-light
            | 結帳去
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
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(couponData),
      });
      const data = await http.json();

      this.coupon = '';
      this.pushToast(data, '優惠卷');
      console.log('coupon', this.carts);
    },
  },
  created() {
    this.getCart();
    document.title = '購物車 | 宇宙咖啡';
  },
};
</script>
