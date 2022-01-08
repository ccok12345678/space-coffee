<template lang="pug">
.modal.fade(tabindex='-1' ref="modal")
  .modal-dialog.modal-dialog-centered
    .modal-content
      .modal-body.text-center
        img.spinner-slow.mb-3(src="../assets/images/black_hole.svg" width="165")
        p.fs-5.text-danger 警告 #[i.bi.bi-exclamation-diamond]：刪除後無法復原，確認刪除
        p.mb-0.fs-5.fw-bold.text-dark {{ itemClass }} {{ tempItem.title }}？
      .p-3.text-center
        button.btn.btn-outline-danger.w-70.mb-2(type='button' @click.prevent="check")
          i.bi.bi-trash.me-2
          | 確認刪除
        button.btn.btn-outline-gray-600.w-70(type='button' data-bs-dismiss='modal') 取消
</template>

<style lang="scss">

</style>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      tempItem: {},
    };
  },
  mixins: [modalMixin],
  props: ['item', 'itemClass'],
  watch: {
    item() {
      this.tempItem = { ...this.item };
    },
  },
  methods: {
    check() {
      this.$emit('emit-delete', this.tempItem);
    },
  },
  created() {
  },
};
</script>
