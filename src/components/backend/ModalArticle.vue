<template lang="pug">
#modal_articles.modal.fade(tabindex="-1" ref="modal")
  .modal-dialog.modal-lg.modal-dialog-centered

    form.modal-content.p-3(@submit.prevent="submitArticle")

      .modal-header.p-2.mb-3
        h5.modal-title 編輯文章
        button.btn-close(type="button" data-bs-dismiss="modal" aria-label="Close")

      .modal-body

        //- Placeholder
        Placeholder(:bgColor="'gray-300'" v-if="isLoading")
        .row.gy-2(v-if="!isLoading")

          .col-3.d-flex
            .my-auto.ms-auto 標題*：
          .col-9
            input.form-control(type="text"
              v-model="tempArticle.title"
              required)

          .col-3.d-flex
            .my-auto.ms-auto 日期*：
          .col-9
            input.form-control(type="date" required
            v-model="create_at")

          .col-3.d-flex
            .my-auto.ms-auto 作者*：
          .col-9
            input.form-control(type="text"
            v-model="tempArticle.author"
            required)

          .col-3.d-flex
            .my-auto.ms-auto 標籤 ：
          .col-9
            form(@submit.prevent="addTag").hstack
              input.form-control.w-40(type="text"
                v-model.trim="tag"
                @keyup.enter.prevent="addTag")
              button.btn.p-1.text-info(type="submit" title="新增標籤"
              )
                i.fs-5.bi.bi-file-earmark-plus

          .col-3
          .col-9
            .d-flex.flex-wrap
              .rounded.bg-gray-300.hstack.me-1.mt-1(v-for="(word, key) in tags" :key="key")
                span.py-1.px-2 {{ word }}
                button.btn.btn-sm(type="button"
                  @click="delTag(word)")
                  | X

          //- Image
          .col-4.col-md-3.d-flex
            .my-auto.ms-auto 圖片連結：
          .col-8.col-md-9
            input.form-control(type="url"
            v-model="tempArticle.image")

          .col-4.col-md-3.d-flex
            .my-auto.ms-auto 上傳圖檔：
          .col-8.col-md-9
            input.form-control(type="file"
              @change.prevent="uploadImg"
              ref="imgInput")
            .text-center.p-3(v-if="isUploading")
              .spinner-grow
                .visually-hidden 載入中……

          //- 預覽功能
          .col-12.col-sm-8.mx-auto(v-if="'image' in tempArticle")
            img.img-fluid(:src="tempArticle.image" title="圖片預覽")
          .w-100

          .col-3.d-flex
            .my-auto.ms-auto 公開*：
          .col-9
            .form-switch.d-flex.align-items-center
              input#articleIsEnabled.form-check-input.p-2.me-2.my-2(type="checkbox"
                role="switch"
                v-model="isPublic"
                :true-value="true"
                :false-value="false")
              label.form-label.m-0(for="articleIsEnabled")
                span.text-success(v-if="isPublic") 公開
                span.text-danger(v-else) 未公開

          .col-12
            .form-floating
              textarea#articleDescription.article-description.form-control(row="10"
              placeholder="請輸入內容"
              v-model="tempArticle.description")
              label(for="articleDescription") 文章摘要

          .col-12
            .form-floating
              textarea#articleContent.article-content.form-control(row="10" placeholder="請輸入文章內容"
              v-model="tempArticle.content"
              required)
              label(for="articleContent") 文章內容*

      .modal-footer.p-0.pt-2.mt-3

        button.btn.btn-cyan-600.text-white.w-30(type="submit" :disabled="isLoading")
          i.bi.bi-check-lg.me-2
          | 送出
        button.btn.btn-outline-gray-600.w-20(type="button" data-bs-dismiss="modal") 取消

</template>

<script>
import modalmixin from '@/mixins/modalMixin';
import Placeholder from '@/components/Placeholder.vue';

export default {
  data() {
    return {
      tempArticle: {},
      create_at: '',
      tags: [],
      tag: '',
      isPublic: false,
      isLoading: false,
      isUploading: false,
    };
  },
  components: {
    Placeholder,
  },
  props: {
    article: {
      type: Object,
      default() { return {}; },
    },
  },
  watch: {
    article() {
      this.tempArticle = {};

      if ('id' in this.article) {
        this.getArticle();
      } else {
        this.isPublic = false;
        this.tags = [];

        const date = new Date(Date.now())
          .toISOString().split('T');
        [this.create_at] = date;
      }
    },
  },
  inject: ['tokenValue'],
  mixins: [modalmixin],
  methods: {
    submitArticle() {
      this.tempArticle.isPublic = this.isPublic;
      this.tempArticle.tag = this.tags;
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000);

      this.$emit('emit-article', this.tempArticle);
    },

    async getArticle() {
      this.isLoading = true;

      const { id } = this.article;
      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}
      `;

      const http = await fetch(api, {
        headers: { Authorization: this.tokenValue },
      });
      const fetchData = await http.json();
      this.tempArticle = await fetchData.article;

      const date = new Date(this.tempArticle.create_at * 1000)
        .toISOString().split('T');
      [this.create_at] = date;

      this.isPublic = this.tempArticle.isPublic;
      this.tags = this.tempArticle.tag ?? [];

      this.isLoading = false;
    },

    addTag() {
      if (this.tag) {
        this.tags.push(this.tag);
        this.tag = '';
      }
    },

    delTag(word) {
      this.tags = this.tags.filter((tag) => tag !== word);
    },

    async uploadImg() {
      this.isUploading = true;

      const api = `
        {process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload
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
          this.tempArticle.image = fetchData.imageUrl;
          this.isUploading = false;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.article {

  &-content {
  height: 150px;
  }

  &-description {
    height: 70px;
  }
}

</style>
