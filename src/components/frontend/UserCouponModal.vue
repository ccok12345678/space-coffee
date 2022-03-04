<template lang="pug">
.modal.fade(tabindex='-1' ref="modal")
  .modal-dialog.modal-dialog-centered
    .modal-content

      .modal-header.d-flex
        h3.m-0.mx-auto 感謝您的訂閱！

      .modal-body.text-center

        p.mb-4 恭喜獲得了訂閱專屬優惠85折🌠
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
        p.mb-1 馬上到購物車使用吧！

      .p-3.text-center
        small.text-muted
          | (本功能僅為展示用，不會記錄您的任何資料)
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
      coupon: 'spacecoffee2222',
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
