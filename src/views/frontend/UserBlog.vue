<template lang="pug">
.container-lg.d-flex.flex-column.align-items-center.my-5(v-if="!articles.length")

  img.favor-img.w-25(src="@/assets/images/ufo_space_icon.svg")
  h3.fs-4.text-gray-600.mt-3 部落格沒有文章！

.container-lg.d-flex.flex-column.align-items-center.my-5(v-if="!!articles.length")

  h3.fs-4.text-gray-600 宇宙咖啡部落格

  .devider.w-50.border-gray-500.mb-3

  .row.justify-content-center.w-100

    router-link.col-md-8.link-dark.text-decoration-none(
      v-for="article in articles" :key="article.id"
      :to="`/blog/${article.id}`")

      .row

        .col-4.col-md-2.text-cyan-600.d-flex.align-items-center
          | {{ $filters.date(article.create_at) }}

        h4.fs-5.col-9.col-md-4.m-md-0.d-flex.align-items-center
          | {{ article.title }}

        .col-12.col-md-6.text-gray-500.d-flex.align-items-center
          | {{ article.description }}

        .col-12.devider.my-2.m-auto.border-gray-300

    .w-100.my-3
    .col-4.col-sm-2
      img.img-fluid(src="@/assets/images/coffee-svgrepo-com.svg")

Pagination(:pages="pagination" @emit-page="getArticles")
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      articles: [],
      temparticle: {},
      pagination: {},
      currentPage: 1,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    async getArticles(page = 1) {
      this.currentPage = page;

      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`;

      const http = await fetch(api);
      const fetchData = await http.json();

      this.articles = fetchData.articles;
      this.pagination = fetchData.pagination;
    },
  },
  created() {
    document.title = '宇宙咖啡部落格 | 宇宙咖啡';

    this.getArticles();
  },
};
</script>
