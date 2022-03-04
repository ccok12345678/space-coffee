<template lang="pug">
.modal.fade(tabindex='-1' ref="modal")
  .modal-dialog.modal-dialog-centered
    .modal-content

      .modal-body.text-center.py-4

        h5.mb-0(v-if="!isPaid")
          | 確認進行付款？
        h5.mb-0.text-success(v-else)
          | 付款完成！

      .modal-footer(v-if="!isPaid")
        button.btn.btn-outline-danger.w-25(
          typpe="button"
          data-bs-dismiss='modal')
          i.bi.bi-x-circle.me-2
          | 取消
        button.btn.btn-cyan-600.text-light.w-25(
          type='button'
          @click="checkPay"
          :disabled="isPaying")
          .spinner-border.spinner-border-sm(v-if="isPaying")
            .visually-hidden Loading...
          i.bi.bi-bag-check.me-2(v-else)
          | 付款

      .modal-footer(v-else)
        button.btn.btn-cyan.text-light.w-25(
        typpe="button"
        data-bs-dismiss='modal')
          i.bi.bi-check-circle.me-2
          | 確認

</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      isPaid: false,
      isNowPaying: false,
    };
  },
  mixins: [modalMixin],
  props: {
    order: {
      type: Object,
      dufault() { return {}; },
    },
    isPaying: {
      type: Boolean,
      default() { return false; },
    },
  },
  watch: {
    order() {
      this.isPaid = this.order.is_paid;
    },
    isPaying() {
      this.isNowPaying = this.isPaying;
    },
  },
  methods: {
    checkPay() {
      this.$emit('emit-pay');
    },
  },
};
</script>
