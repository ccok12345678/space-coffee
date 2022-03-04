<template lang="pug">
#modal_order.modal.fade.text-nowrap(tabindex="-1" ref="modal")
  .modal-dialog.modal-dialog-centered.overflow-auto

    form.modal-content.overflow-auto(v-if="tempOrder.user")

      .modal-header.p-3

        h5.m-0(v-if="!tempOrder.isEditable") 檢視訂單
        h5.m-0(v-else) 修改訂單
          i.bi.bi-pencil-square.ms-2

        button.btn-close(data-bs-dismiss="modal" aria-label="Close")

      .modal-body

        h6.fw-bold 訂購人資訊

        .row
          label.col-3.col-form-label.py-1.d-block(for="buyerName")
            | 訂購人：
          .col-9
            input#buyerName.form-control.bg-transparent.ps-2.form-control-plaintext.buyer-input(
              type="text"
              v-model="tempOrder.user.name" readonly)

          label.col-3.col-form-label.py-1(for="buyerEmail")
            | 電子信箱：
          .col-9
            input#buyerEmail.form-control.bg-transparent.ps-2.buyer-input(type="email"
              v-model="tempOrder.user.email" :readonly="!tempOrder.isEditable"
              :class=" {'form-control-plaintext': !tempOrder.isEditable} ")

          label.col-3.col-form-label.py-1(for="buyerTel")
            | 電話：
          .col-9
            input#buyerTel.form-control.bg-transparent.ps-2.buyer-input(type="tel"
              v-model="tempOrder.user.tel" :readonly="!tempOrder.isEditable"
              :class=" {'form-control-plaintext': !tempOrder.isEditable} ")

          label.col-3.col-form-label.py-1(for="buyerAddress")
            | 地址：
          .col-9
            input#buyerAddress.form-control.bg-transparent.ps-2.buyer-input(type="text"
              v-model="tempOrder.user.address" :readonly="!tempOrder.isEditable"
              :class=" {'form-control-plaintext': !tempOrder.isEditable} ")

        .divider.border-gray-500.w-100.mb-3

        h6.fw-bold 訂單狀態

        .row

          .col-3.py-1
            | 訂單編號：
          .col-9
            .py-1.ps-2
              | {{ tempOrder.id }}

          .col-3.py-1
            | 下單日期：
          .col-9
            .py-1.ps-2
              | {{ $filters.date(tempOrder.create_at) }}

          .col-3.py-1
            | 付款金額：
          .col-9
            .py-1.ps-2
              | $ {{ $filters.currency(tempOrder.total) }}

          .col-3.py-1
            | 付款狀態：

          .col-9.form-switch.ps-3.d-flex.align-items-center
            input#orderIsPaid.form-check-input.m-0.p-2.shadow-0(type="checkbox" role="switch"
              v-model="tempOrder.is_paid" :disabled="!tempOrder.isEditable")
            label.form-label.my-0.ms-2(for="orderIsPaid")
              span.text-success(v-if="tempOrder.is_paid") 已付款
              span.text-danger(v-else) 未付款

        .divider.border-gray-500.w-100.mb-3

        h6.fw-bold 訂單內容

        ul.list-group.list-group-flush
          li.list-group-item.p-1(v-for="(item, key) of tempOrder.products" :key="key")

            .row

              .col-8
                p.py-2.m-0
                  | • {{ item.product.title }}({{ item.product.unit }})＊{{ item.qty }}

              .col-4.d-flex
                p.py-2.m-0 單價：$ {{ $filters.currency(item.total) }}

                button.btn.hover-red.ms-auto(type="button" title="刪除品項"
                  :disabled="!tempOrder.isEditable"
                  @click="removeItem(key)") X

      .modal-footer

        //- show in review
        button.btn.btn-cyan-600.text-light(type="button"
          data-bs-dismiss="modal" aria-label="Close"
          v-if="!tempOrder.isEditable") 確認

        //- show in edit
        button.btn.btn-cyan-600.text-light(type="button"
          v-if="tempOrder.isEditable"
          @click="updateOrder") 送出修改

        button.btn.btn-outline-gray-600(type="button"
          data-bs-dismiss="modal" aria-label="Close") 取消

</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      tempOrder: {},
    };
  },
  props: {
    order: {
      type: Object,
      default() { return {}; },
    },
  },
  mixins: [modalMixin],
  watch: {
    order() {
      this.tempOrder = JSON.parse(JSON.stringify(this.order));
    },
  },
  methods: {
    removeItem(id) {
      delete this.tempOrder.products[`${id}`];
    },
    updateOrder() {
      this.$emit('emit-order', this.tempOrder);
    },
  },
};
</script>
