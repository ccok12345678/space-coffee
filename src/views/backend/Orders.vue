<template lang="pug">
.alert.alert-info(v-if="!orders.length")
  | 還未收到訂單！

section.w-100.overflow-auto.text-nowrap(v-if="!!orders.length")

  table.table.table-sm.table-light.table-striped.table-hover.align-middle

    thead
      tr
        th 下單時間
        th 買家
        th.text-center.d-none.d-sm-table-cell 訂單內容
        th.text-center.d-table-cell.d-sm-none
          | 訂單編號
          i.bi.bi-eye.ms-2
        th.text-center 金額
        th.text-center 付款
        th

    tbody

      tr(v-for="order in orders" :key="order.id")

        td {{ $filters.date(order.create_at) }}

        td {{ order.user.name }}

        td.d-none.d-sm-table-cell
          a.link-dark.text-decoration-none(href="#"
            @click.prevent="openModal(order, false)" title="僅可檢視")
            p.m-0(v-for="(item, i) in order.products" :key="i")
              | • {{ item.product.title }}（{{ item.product.unit }}）*{{ item.product.num }}

        td.d-table-cell.d-sm-none
          a.link-dark.text-decoration-none(href="#" @click.prevent="openModal(order, false)")
            | • {{ order.id }}

        td {{ $filters.currency(order.total) }}

        td
          span.text-success(v-if="order.is_paid") 已付款
          span.text-danger(v-else) 未付款

        td

          button.border-0.hover-gray.p-2.d-block.w-100(type="button" title="檢視編輯"
            @click.prevent="openModal(order, true)")
            i.bi.bi-pencil-square

          button.border-0.hover-red.p-2.d-block.w-100(type="button" title="刪除"
            @click.prevent="checkDelete(order)")
            i.bi.bi-trash

Pagination(:pages="pagination" @emit-page="getOrders")

OrderModal(ref="orderModal" :order="tempOrder" @emit-order="updateOrder")

DeleteModal(ref="deleteModal"
  :item="tempOrder" :itemClass="'訂單'"
  @emit-delete="delOrder")

VueLoading(:active="isLoading")

</template>

<script>
import OrderModal from '@/components/backend/ModalOrder.vue';
import DeleteModal from '@/components/backend/ModalDelete.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      currentPage: 1,
      isLoading: false,
    };
  },
  components: {
    Pagination,
    OrderModal,
    DeleteModal,
  },
  inject: ['tokenValue', 'pushToast'],
  methods: {
    async getOrders(page = 1) {
      this.isLoading = true;

      this.currentPage = page;

      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/orders?page=${this.currentPage}
      `;
      try {
        const http = await fetch(api, {
          headers: { Authorization: this.tokenValue },
        });
        const fetchData = await http.json();

        this.orders = fetchData.orders;
        this.pagination = fetchData.pagination;
      } catch (error) {
        console.error(error);
      }

      this.isLoading = false;
    },

    openModal(order, isEditable) {
      this.tempOrder = { ...order };
      this.tempOrder.isEditable = isEditable;

      this.$refs.orderModal.showModal();
    },

    async updateOrder(order) {
      this.$refs.orderModal.hideModal();

      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}
      `;
      const updateData = { data: { ...order } };

      try {
        const http = await fetch(api, {
          method: 'put',
          headers: {
            Authorization: this.tokenValue,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        const fetchData = await http.json();

        this.getOrders(this.currentPage);
        this.pushToast(fetchData, '訂單');
      } catch (error) {
        console.error(error);
      }
    },

    checkDelete(item) {
      this.tempOrder = { ...item };
      this.$refs.deleteModal.showModal();
    },

    async delOrder(order) {
      this.$refs.deleteModal.hideModal();

      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}
      `;
      try {
        const http = await fetch(api, {
          method: 'delete',
          headers: { Authorization: this.tokenValue },
        });
        const fetchData = await http.json();

        this.pushToast(fetchData, '訂單');
        this.getOrders(this.currentPage);
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
