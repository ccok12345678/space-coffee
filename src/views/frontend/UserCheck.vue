<template lang="pug">
.container-lg.my-4

  .row.justify-content-center(v-if="order.user")

    .col-md-10.d-flex.flex-column.align-items-center

      ProgressBar(:step="$route.name" :isPaid="order.is_paid")

      h4.text-gray-700 已建立訂單

      .divider.w-25.boder-dark.my-3

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
              @click="openModal"
              :disabled="isPaying")
              | 進行付款
              .spinner-border.spinner-border-sm(v-if="isPaying")
                .visually-hidden Loading...

        .col-3.d-flex.justify-content-center.align-items-center.fw-bold.border.p-0
          | 聯絡資訊
        .col-9.border.py-2
          p.mb-1 姓名：{{ $filters.userName(order.user.name) }}
          p.mb-1 電話：{{ $filters.userPhone(order.user.tel) }}
          p.mb-1 E-Mail：{{ $filters.userEmail(order.user.email) }}
          p.mb-1 收件地址：{{ $filters.userAddress(order.user.address) }}

        .col-3.d-flex.justify-content-center.align-items-center.fw-bold.border.p-0
          | 其他
        .col-9.border.py-2
          router-link.text-decoration-none(:to="{ name: 'UserOrders' }") 察看其他訂單

PayModal(
  ref="payModal"
  :order="order"
  :isPaying="isPaying"
  @emit-pay="payOrder")

</template>

<script>
import ProgressBar from '@/components/frontend/UserProgressBar.vue';
import PayModal from '@/components/frontend/UserPayModal.vue';

export default {
  metaInfo: {
    title: '已建立訂單',
  },
  data() {
    return {
      orderId: '',
      order: {},
      isPaying: false,
    };
  },
  components: {
    ProgressBar,
    PayModal,
  },
  inject: ['pushToast', 'scrollTop'],
  methods: {
    async getOrder() {
      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}
      `;
      try {
        const http = await fetch(api);
        const fetchData = await http.json();

        if (fetchData.success) {
          this.order = fetchData.order;
        }
      } catch (error) {
        console.error(error);
      }
    },

    openModal() {
      this.$refs.payModal.showModal();
    },

    async payOrder() {
      this.isPaying = true;

      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}
      `;
      try {
        const http = await fetch(api, { method: 'post' });
        const fetchData = await http.json();

        this.pushToast(fetchData, '訂單');
        this.getOrder();
      } catch (error) {
        console.error(error);
      }
      this.isPaying = false;
    },
  },
  created() {
    this.scrollTop();

    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
