<template lang="pug">
a.btn.btn-secondary.btn-fixed.fs-3.hover-half-transparent.text-light.border-0(
  href="#"
  title="新增文章"
  @click.prevent="openModal(true)")
  i.bi.bi-file-earmark-plus

.alert.alert-info(v-if="!articles.length")
  | 還未新增文章

section.w-100.overflow-auto.text-nowrap.text-center(v-if="!!articles.length")
  table.table.table-sm.table-light.table-striped.table-hover.align-middle(v-if="true")
    thead
      tr
        th 日期
        th 標題
        th 作者
        th 公開
        th

    tbody
      tr(v-for="article in articles" :key="articles.id")
        td {{ $filters.date(article.create_at) }}
        td {{ article.title }}
        td {{ article.author }}

        td
          .text-success(v-if="article.isPublic") 已公開
          .text-danger(v-else) 未公開

        td
          button.border-0.hover-gray.py-2.d-block.w-100(type="button" title="編輯"
            @click="openModal(false, article)")
            i.bi.bi-pencil-square

          button.border-0.hover-red.py-2.d-block.w-100(type="button" title="刪除"
            @click="checkDelete(article)")
            i.bi.bi-trash

ArticleModal(ref="articleModal"
  :article="tempArticle" @emit-article="updateArticle")

Pagination(:pages="pagination" @emit-page="getArticles")

DeleteModal(ref="deleteModal"
  :item="tempArticle" :itemClass="'文章'"
  @emit-delete="delArticle")

VueLoading(:active="isLoading")
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import ArticleModal from '@/components/backend/ModalArticle.vue';
import DeleteModal from '@/components/backend/ModalDelete.vue';

export default {
  metaInfo: {
    title: '部落格',
  },
  data() {
    return {
      articles: [],
      tempArticle: {},
      pagination: {},
      currentPage: 1,
      isNew: false,
      isLoading: false,
    };
  },
  components: {
    Pagination,
    ArticleModal,
    DeleteModal,
  },
  inject: ['tokenValue', 'pushToast'],
  methods: {
    async getArticles(page = 1) {
      this.isLoading = true;
      this.currentPage = page;

      const api = `
          ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}
        `;

      try {
        const http = await fetch(api, {
          headers: { Authorization: this.tokenValue },
        });
        const fetchData = await http.json();

        this.articles = fetchData.articles;
        this.pagination = fetchData.pagination;
      } catch (error) {
        console.error(error);
      }

      this.isLoading = false;
    },

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
      let api; let method; let page;

      if (this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
        method = 'post';
        page = 1;
      } else {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${article.id}`;
        method = 'put';
        page = this.currentPage;
      }
      const articleData = { data: { ...article } };
      try {
        const http = await fetch(api, {
          method,
          headers: {
            Authorization: this.tokenValue,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articleData),
        });
        const fetchData = await http.json();

        this.getArticles(page);

        this.pushToast(fetchData, '部落格');
      } catch (error) {
        console.error(error);
      }
      this.isNew = false;
    },

    checkDelete(item) {
      this.tempArticle = { ...item };

      this.$refs.deleteModal.showModal();
    },

    async delArticle(article) {
      this.$refs.deleteModal.hideModal();

      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${article.id}`;
      const http = await fetch(api, {
        method: 'delete',
        headers: { Authorization: this.tokenValue },
      });
      const fetchData = await http.json();

      this.pushToast(fetchData, '部落格');

      if (fetchData.success) {
        this.getArticles(this.currentPage);
      }
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
