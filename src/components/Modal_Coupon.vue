<template lang="pug">
#modal_product.modal.fade(tabindex="-1" ref="modal")
  .modal-dialog.modal-dialog-centered
    form.modal-content.p-3(@submit.prevent="update")
      .modal-header.p-2.mb-3
        h5.modal-title 編輯優惠卷
        button.btn-close(type="button" data-bs-dismiss="modal" aria-label="Close")
      .modal-body
        .row
          label.col-3.col-form-label.py-1(for="couponName")
            | 優惠卷：
          .col-9.mb-2
            input#couponName.form-control.ps-2(type="text" required
              v-model="tempCoupon.title")
          label.col-3.col-form-label.py-1(for="couponCode")
            | 優惠碼：
          .col-9.mb-2
            input#couponCode.form-control.ps-2(type="text" required
              v-model="tempCoupon.code")
          .w-100
          label.col-3.col-form-label.py-1(for="couponDueDate")
            | 到期日：
          .col.mb-2
            input#couponDueDate.form-control.ps-2(type="date" required
              v-model="due_date")
          .w-100
          label.col-3.col-form-label.py-1(for="couponPercent")
            | 折數：
          .col-6.mb-2
            .input-group
              input#couponPercent.form-control.ps-2(type="number" min="0.1" max="9.9" step="0.1"
                v-model="discount" required)
              span.input-group-text 折
          .w-100
          .col-3.py-1
            | 啟用：
          .col-6.text-center
            .form-switch.py-1
              input#couponIsEnabled.form-check-input.p-2.me-2(type="checkbox"
                role="switch"
                v-model="is_enabled"
                :true-value="1"
                :false-value="0")
              label.form-label(for="couponIsEnabled")
                span.text-success(v-if="is_enabled") 啟用
                span.text-danger(v-else) 未啟用
          .w-100
      .modal-footer.p-0.pt-2.mt-3
        button.btn.btn-cyan-600.text-white.w-30(type="submit")
          i.bi.bi-check-lg.me-2
          | 送出
        button.btn.btn-outline-gray-600.w-20(type="button" data-bs-dismiss="modal") 取消
</template>

<script>
import modalmixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      tempCoupon: {},
      due_date: '',
      is_enabled: 1,
      discount: 0.1,
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

      if (this.tempCoupon.due_date) {
        // 轉換時間格式
        const date = new Date(this.tempCoupon.due_date * 1000)
          .toISOString().split('T');
        [this.due_date] = date;

        this.is_enabled = this.tempCoupon.is_enabled;
        this.discount = this.tempCoupon.percent / 10;
      } else {
        this.due_date = '';
        this.is_enabled = 0;
        this.discount = 0;
      }
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  methods: {
    update() {
      this.tempCoupon.is_enabled = this.is_enabled;
      this.tempCoupon.percent = this.discount * 10;
      this.$emit('emit-coupon', this.tempCoupon);
    },
  },
};
</script>
