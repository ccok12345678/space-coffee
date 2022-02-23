<template lang="pug">
#modal_product.modal.fade(tabindex="-1" ref="modal")
  .modal-dialog.modal-lg.modal-dialog-centered

    form.modal-content.p-3(@submit.prevent="update")

      .modal-header.p-2.mb-3
        h5.modal-title 編輯商品
        button.btn-close(type="button" data-bs-dismiss="modal" aria-label="Close")

      .row
        .col-sm-7
          .hstack

            .mb-4.me-2.w-70
              label.form-label.mb-1(for="productTitle") 品項名稱*：
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
              label.form-label.mb-1(for="productCategory") 品項分類*：
              input#productCategory.form-control.form-control-sm(type="text"
                v-model="tempProduct.category" required)

            .mb-4.w-30
              label.form-label.mb-1(for="productUnit") 單位*：
              input#productUnit.form-control.form-control-sm(type="text"
                v-model="tempProduct.unit" required)

          .hstack

            .mb-4.w-50.me-2
              label.form-label.mb-1(for="productOriginPrice") 定價*：
              input#productOriginPrice.form-control.form-control-sm(type="number"
                v-model="tempProduct.origin_price"
                placeholder="請輸入定價" step="1" min="0" required)

            .mb-4.w-50
              label.form-label.mb-1(for="productPrice") 售價*：
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

        //- product image
        .col-sm-5
          .mb-1 商品主圖：

          //- uploading animation
          .text-center.p-3(v-if="isUploading")
            .spinner-grow
              .visually-hidden 載入中……
          //- image preview
          .vstack.mt-(v-if="tempProduct.imageUrl")
            button.btn.me-auto.hover-red(type="button"
              @click="tempProduct.imageUrl = ''" title="移除") X
            img.img-fluid.img-thumbnail(
              :src="tempProduct.imageUrl"
              alt="圖片連結無效")

          input.form-control.form-control-sm.my-2(type="url" placeholder="圖片網址🔗"
            v-model.trim="tempProduct.imageUrl")
          .mt-4
            label.form-label.mb-1(for="uploadImg") 或上傳檔案：
            input#uploadImg.form-control.form-control-sm(type="file"
              ref="imgInput"
              @change="uploadImg"
              :key="tempProduct.id")

          //- mutiple images
          .mt-4
            label.form-label.mb-1(for="mutitleImg") 多圖連結：
            .input-group
              input#uploadImg.form-control.form-control-sm(type="url"
                placeholder="圖片網址🔗"
                v-model.trim="imageUrl")
              button.btn.btn-sm.btn-outline-gray-500(type="button"
                @click="addImage")
                | 新增圖片
            //- preview
            .mt-2.vstack(v-for="(imgUrl, key) in tempProduct.imagesUrl" :key="key")
              button.btn.me-auto.hover-red(title="移除"
                @click="removeImg(imgUrl)") X
              img.img-fluid.img-thumbnail(:src="imgUrl" title="圖片預覽" alt="圖片連結無效")

      .modal-footer.p-0.pt-2.mt-3

        button.btn.btn-cyan-600.text-white.w-30(type="submit")
          i.bi.bi-check-lg.me-2
          | 送出

        button.btn.btn-outline-gray-600.w-20(type="button" data-bs-dismiss="modal")
          | 取消
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      tempProduct: {},

      // for multiple images
      imageUrl: '',

      isUploading: false,
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
    },
  },
  methods: {
    update() {
      this.$emit('updateProduct', this.tempProduct);
    },

    async uploadImg() {
      this.tempProduct.imageUrl = '';
      this.isUploading = true;

      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload
      `;
      const uploadImg = this.$refs.imgInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadImg);

      try {
        const http = await fetch(api, {
          method: 'post',
          headers: { Authorization: this.tokenValue },
          body: formData,
        });
        const fetchData = await http.json();
        if (fetchData.success) {
          this.tempProduct.imageUrl = fetchData.imageUrl;
          this.isUploading = false;
        }
      } catch (error) {
        console.error(error);
      }
    },

    addImage() {
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }

      if (this.imageUrl !== '') {
        this.tempProduct.imagesUrl.unshift(this.imageUrl);
      }

      this.imageUrl = '';
    },

    removeImg(url) {
      this.tempProduct.imagesUrl = this.tempProduct.imagesUrl
        .filter((imageUrl) => imageUrl !== url);
    },
  },
};
</script>

<style lang="scss" scoped>
.textarea {
  height: 100px;
}
</style>
