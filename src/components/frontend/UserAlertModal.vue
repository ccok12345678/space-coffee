<template lang="pug">
.modal.fade(tabindex='-1' ref="modal")
  .modal-dialog.modal-dialog-centered
    .modal-content

      .modal-body.text-center

        img.spinner-slow.my-3(
          src="@/assets/images/black_hole.svg"
          width="165"
          alt="Loading...")

        p.fs-5.text-danger.mb-0
          | 清除所有收藏商品？

      .p-3.text-center
        button.btn.btn-danger.w-70.mb-2(type='button' @click="checkClear")
          i.bi.bi-trash.me-2
          | 確認清除
        button.btn.btn-outline-gray-600.w-70(type='button' data-bs-dismiss='modal')
          | 取消
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
  },
  mixins: [modalMixin],
  methods: {
    checkClear() {
      this.$emit('emit-clear');
    },
  },
};
</script>
