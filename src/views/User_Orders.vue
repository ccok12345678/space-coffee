<template lang="pug">
.container-lg.my-4

  .row.justify-content-center

    //- show if no order
    .col-md-10.d-flex.flex-column.align-items-center(v-if="orders.length === 0")
      .mb-2.text-center.w-30
        img.spinner-slow.mb-4(src="../assets/images/galaxy_icon.svg")
        h4.fs-4.text-gray-700 尚未建立訂單!

    .col-md-10.d-flex.flex-column.align-items-center(v-if="orders.length > 0")

      h4.text-gray-700 所有訂單

      .devider.w-25.boder-dark.my-3

      main.row.w-100.gy-3

        .col-sm-6.col-md-4(v-for="(order, i) in orders" :key="order.id")

          .card

            .card-header
              | 下單日期：{{ $filters.date(order.create_at) }}

            .card-body.pb-2
              .mb-2 訂單編號：
              .text-end {{ order.id }}

              .devider.w-100.border-gray-300.my-2

              .mb-2.d-flex.justify-content-between
                span 訂單金額：
                span NT$ {{ $filters.currency(order.total) }}

              .mb-2.d-flex.justify-content-between
                | 付款狀態：
                div
                  span.text-info(v-if="order.is_paid") 已付款
                  span.text-danger(v-else) 未付款

              .devider.w-100.border-gray-300.my-3

              router-link.btn.btn-outline-gray-600.w-100(:to="`/order/${order.id}`")
                | 檢視

    .col-12.d-flex
      Pagination.mx-auto(:pages="pagination" @emit-page="getOrders")

</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      currentPage: 1,
    };
  },
  components: {
    Pagination,
  },
  inject: ['scrollTop'],
  methods: {
    async getOrders(page = 1) {
      this.currentPage = page;

      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/orders?page=${this.currentPage}
      `;
      const http = await fetch(api);
      const fetchData = await http.json();

      if (fetchData.success) {
        this.orders = fetchData.orders;
        this.pagination = fetchData.pagination;
      }
    },
  },
  created() {
    document.title = '檢視訂單｜宇宙咖啡';
    this.scrollTop();
    this.getOrders();
  },
};
</script>
