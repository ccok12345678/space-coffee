<template lang="pug">
.container-lg.my-4
  .row.justify-content-center(v-if="order.user")
    .col-md-10.d-flex.flex-column.align-items-center
      h4.text-gray-700 已建立訂單
      .devider.w-25.boder-dark.my-3
      main.row.w-100
        .col-3.d-flex.justify-content-center.align-items-center.fw-bold.border.p-0
          | 訂單日期
        .col-9.border.py-2
          | {{ $filters.date(order.create_at) }}
        .col-3.d-flex.justify-content-center.align-items-center.fw-bold.border.p-0
          | 訂單編號
        .col-9.border.py-2
          | {{ order.id }}
        .col-3.d-flex.justify-content-center.align-items-center.fw-bold.border.p-0
          | 訂單內容
        .col-9.border.py-2
          p.mb-1(v-for="(item, key, i) in order.products" :key="key")
            | {{ i + 1 }}、{{ item.product.title }}（{{ item.product.unit }}），數量：{{ item.qty }}
        .col-3.d-flex.justify-content-center.align-items-center.fw-bold.border.p-0
          | 訂單金額
        .col-9.border.py-2
          | NT$ {{ $filters.currency(order.total) }}
        .col-3.d-flex.justify-content-center.align-items-center.fw-bold.border.p-0
          | 付款狀態
        .col-9.border.py-2
          span.text-info(v-if="order.is_paid") 已付款
          div(v-else)
            span.text-danger.me-2 未付款
            button.btn.btn-cyan-600.text-light(type="button"
              @click.prevent="payOrder"
              :disabled="isPaying")
              | 進行付款
              .spinner-border.spinner-border-sm(v-if="isPaying")
                .visually-hidden Loading...
        .col-3.d-flex.justify-content-center.align-items-center.fw-bold.border.p-0
          | 聯絡資訊
        .col-9.border.py-2
          p.mb-1 姓名：{{ order.user.name }}
          p.mb-1 電話：{{ order.user.tel }}
          p.mb-1 E-Mail：{{ order.user.email }}
          p.mb-1 收件地址：{{ order.user.address }}
        .col-3.d-flex.justify-content-center.align-items-center.fw-bold.border.p-0
          | 其他
        .col-9.border.py-2
          router-link.text-decoration-none(:to="{ name: 'UserOrders' }") 察看其他訂單
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
      order: {},
      isPaying: false,
    };
  },
  inject: ['pushToast', 'scrollTop'],
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
    async payOrder() {
      this.isPaying = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      const http = await fetch(api, { method: 'post' });
      const data = await http.json();

      console.log('pay', data);
      this.pushToast(data, '訂單');
      this.getOrder();
      this.isPaying = false;
    },
  },
  created() {
    document.title = '訂單確認｜宇宙咖啡';
    this.scrollTop();
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
