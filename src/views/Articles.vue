<template lang="pug">
a.btn.btn-secondary.btn-fixed.fs-3.hover-half-transparent.text-light.border-0(
  title="新增文章" @click.prevent="openModal(true)")
  i.bi.bi-file-earmark-plus
section.w-100.overflow-auto.text-nowrap.text-center(v-if="true")
  table.table.table-sm.table-light.table-striped.table-hover.align-middle
    thead
      tr
        th 日期
        th 標題
        th 作者
        th 公開
        th
ArticleModal(ref="articleModal"
  :article="tempArticle" @emit-article="updateArticle")
//- Pagination(:pages="pagination" @emit-page="")
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import ArticleModal from '@/components/Modal_Article.vue';

export default {
  data() {
    return {
      articles: [],
      tempArticle: {},
      pagination: {},
      currentPage: 1,
      isNew: false,
    };
  },
  components: {
    Pagination,
    ArticleModal,
  },
  inject: ['tokenValue', 'pushToast'],
  methods: {
    openModal(isNew, article) {
      this.isNew = isNew;

      if (isNew) {
        this.tempArticle = {};
      } else {
        this.tempArticle = { ...article };
      }
      this.$refs.articleModal.showModal();
    },
    async updateArticle(article) {
      this.$refs.articleModal.hideModal();
      let api; let method; // let page;

      if (this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
        method = 'post';
        // page = 1;
      } else {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${article.id}`;
        method = 'put';
        // page = this.currentPage;
      }
      const articleData = { data: { ...article } };
      const http = await fetch(api, {
        method,
        headers: {
          Authorization: this.tokenValue,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      try {
        const fetchData = await http.json();
        // this.getArticles(page);
        console.log('article', fetchData);
        this.pushToast(fetchData, '部落格');
      } catch (error) {
        console.error(error);
      }
      this.isNew = false;
    },
  },
};
</script>
