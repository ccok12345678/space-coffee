<template lang="pug">
#modal_product.modal.fade(tabindex="-1" ref="modal")
  .modal-dialog.modal-dialog-centered
    form.modal-content.p-3(@submit.prevent="update")
      .modal-header.p-2.mb-3
        h5.modal-title 編輯優惠卷
        button.btn-close(type="button" data-bs-dismiss="modal" aria-label="Close")
      .modal-body
        | {{ tempCoupon }}
        .row
          label.col-3.col-form-label.py-1(for="couponName")
            | 優惠卷：
          .col-9.mb-1
            input#couponName.form-control.ps-2(type="text"
              v-model="tempCoupon.title")
          label.col-3.col-form-label.py-1(for="couponCode")
            | 優惠碼：
          .col-9.mb-1
            input#couponCode.form-control.ps-2(type="text"
              v-model="tempCoupon.code")
          .w-100
          label.col-3.col-form-label.py-1(for="couponPercent")
            | 折數：
          .col-6.mb-1
            .input-group
              input#couponPercent.form-control.ps-2(type="number" min="0" max="99.99"
                v-model="tempCoupon.percent")
              span.input-group-text 折
          .w-100
          label.col-3.col-form-label.py-1(for="couponIsEnabled")
            | 啟用：
          .col-6
            .form-switch.py-1
              input#couponIsEnabled.form-check-input.p-2.me-2(type="checkbox"
                role="switch"
                v-model="tempCoupon.is_enabled"
                :true-value="1"
                :false-value="0")
              span.text-success(v-if="tempCoupon.is_enabled") 啟用
              span.text-danger(v-else) 未啟用
</template>

<script>
import modalmixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      tempCoupon: {},
    };
  },
  mixins: [modalmixin],
  props: {
    coupon: {
      type: Object,
      default() { return {}; },
    },
  },
  watch: {
    coupon() {
      this.tempCoupon = { ...this.coupon };
      console.log('in coupon modal', this.tempCoupon);
    },
  },
};
</script>
