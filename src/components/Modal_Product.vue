<template lang="pug">
#modal_product.modal(tabindex="-1" ref="modal")
  .modal-dialog.modal-lg
    form.modal-content.p-3(@submit.prevent="update")
      .modal-header.p-2.mb-3
        h5.modal-title 編輯商品
        button.btn-close(type="button" data-bs-dismiss="modal" aria-label="Close")
      .row
        //- 商品內容
        .col-sm-7
          .hstack
            .mb-4.me-2.w-70
              label.form-label.mb-1(for="productTitle") 品項名稱：
              input#productTitle.form-control.form-control-sm(type="text" required
                v-model="tempProduct.title")
            .mb-4.form-switch.w-30.text-center.p-0.d-flex.flex-column.align-items-center
              label.form-label(for="productSwitch")
                | 上架
              input#productSwitch.form-check-input.m-0.p-2.shadow-0(
                type="checkbox" role="switch"
                v-model="tempProduct.is_enabled" :true-value="1" :false-value="0")
          .hstack
            .mb-4.me-2.w-70
              label.form-label.mb-1(for="productCategory") 品項分類：
              input#productCategory.form-control.form-control-sm(type="text"
                v-model="tempProduct.category" required)
            .mb-4.w-30
              label.form-label.mb-1(for="productUnit") 單位：
              input#productUnit.form-control.form-control-sm(type="text"
                v-model="tempProduct.unit" required)
          .hstack
            .mb-4.w-50.me-2
              label.form-label.mb-1(for="productOriginPrice") 定價：
              input#productOriginPrice.form-control.form-control-sm(type="number"
                v-model="tempProduct.origin_price"
                placeholder="請輸入定價" step="1" min="0" required)
            .mb-4.w-50
              label.form-label.mb-1(for="productPrice") 售價：
              input#productPrice.form-control.form-control-sm(type="number"
                v-model="tempProduct.price"
                placeholder="請輸入售價" step="1" min="0" required)
          .form-floating.mb-4
            textarea#productDescription.form-control.textarea(
              v-model="tempProduct.description")
            label(for="productDescription") 商品描述：
          .form-floating.mb-4
            textarea#productContent.form-control.textarea(
              v-model="tempProduct.content")
            label(for="productContent") 相關說明：
        //- 商品圖片
        .col-sm-5
          h6 商品圖片：
          img.img-fluid(:src="tempProduct.imageUrl" v-if="tempProduct.imageUrl")
          input.form-control.form-control-sm.my-2(type="url" placeholder="圖片網址🔗"
            v-model="tempProduct.imageUrl")
          .mt-4
            label.form-label.mb-1(for="uploadImg") 或上傳檔案：
            input#uploadImg.form-control.form-control-sm(type="file")
            // 上傳功能
            // 多圖上傳
      .modal-footer.p-0.pt-2.mt-3
        button.btn.btn-cyan-600.text-white(type="submit") 確認
        button.btn.btn-secondary(type="button" data-bs-dismiss="modal") 取消
</template>

<style lang="scss" scoped>
.textarea {
  height: 100px;
}
</style>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      tempProduct: {},
    };
  },
  inject: ['tokenValue'],
  mixins: [modalMixin],
  props: {
    product: {
      type: Object,
      default() { return {}; },
    },
  },
  watch: {
    product() {
      this.tempProduct = { ...this.product };
      console.log('in modal', this.tempProduct);
    },
  },
  methods: {
    update() {
      this.$emit('updateProduct', this.tempProduct);
    },
  },
};
</script>
