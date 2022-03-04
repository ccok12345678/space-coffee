<template lang="pug">
.modal.fade(tabindex='-1' ref="modal")
  .modal-dialog.modal-dialog-centered
    .modal-content

      .modal-body.text-center.py-4

        p.mb-4 獲得9折優惠，太棒了！🌟
        p.mb-4 優惠碼：
          span.text-gray-500(
            v-if="isCopied")
            | {{ coupon }}
            | (已複製)
          a.text-decoration-none.text-success(
            href="#"
            title="複製優惠碼"
            v-else
            @click.prevent="copyCoupon")
            | {{ coupon }}
            |  (複製)
        p.mb-4 馬上到購物車使用吧！

        button.btn.btn-cyan-600.text-light.w-70(
          type='button'
          data-bs-dismiss='modal'
          @click="isCopied = false")
          | 確認
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      coupon: 'spacecollections',
      isCopied: false,
    };
  },
  mixins: [modalMixin],
  methods: {
    copyCoupon() {
      navigator.clipboard.writeText(this.coupon)
        .then(this.isCopied = true);
    },
  },
};
</script>
