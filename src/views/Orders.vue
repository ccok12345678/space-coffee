<template lang="pug">
section.w-100.overflow-auto.text-nowrap(v-if="!!orders.length")
  table.table.table-sm.table-light.table-striped.table-hover.align-middle
    thead
      tr
        th 下單時間
        th 買家
        th.text-center.d-none.d-sm-table-cell 訂單內容
          i.bi.bi-pencil-square.ms-2
        th.text-center.d-table-cell.d-sm-none
          | 訂單編號
          i.bi.bi-pencil-square.ms-2
        th.text-center 金額
        th.text-center 付款
        th
    tbody
      tr(v-for="order in orders" :key="order.id")
        td {{ $filters.date(order.create_at) }}
        td {{ order.user.name }}
        td.d-none.d-sm-table-cell
          a.link-dark.text-decoration-none(href="#" @click.prevent="openModal(order)")
            p.m-0(v-for="(item, i) in order.products" :key="i")
              | • {{ item.product.title }}（{{ item.product.unit }}）*{{ item.product.num }}
        td.d-table-cell.d-sm-none
          a.link-dark.text-decoration-none(href="#" @click.prevent="openModal(order)")
            | • {{ order.id }}
        td {{ $filters.currency(order.total) }}
        td
          span.text-success(v-if="order.is_paid") 已付款
          span.text-danger(v-else) 未付款
        td.text-end
          button.border-0.hover-gray.p-2.d-block.w-100(type="button" title="檢視編輯"
            @click.prevent="openModal(order)")
            i.bi.bi-pencil-square
          button.border-0.hover-red.p-2.d-block.w-100(type="button" title="刪除")
            i.bi.bi-trash
Pagination(:pages="pagination" @emit-page="getOrders")
OrderModal(ref="orderModal" :order="tempOrder")
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import OrderModal from '@/components/Modal_Order.vue';

export default {
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
    };
  },
  components: {
    Pagination,
    OrderModal,
  },
  inject: ['tokenValue'],
  methods: {
    async getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/orders?page=${page}`;
      const http = await fetch(api, {
        headers: { Authorization: this.tokenValue },
      });
      const data = await http.json();
      this.orders = data.orders;
      this.pagination = data.pagination;
      console.log('orders', data);
    },
    openModal(order) {
      this.tempOrder = { ...order };
      this.$refs.orderModal.showModal();
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
