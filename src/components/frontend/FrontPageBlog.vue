<template lang="pug">
.container-lg.my-5(
  v-if="!!articles.length")

  .row.gy-4.w-100

    .col-12.col-md-8.d-flex.align-items-center.justify-content-center
      .d-flex.flex-column.align-items-center
        h3.fs-4.text-gray-600 部落格更新

        .divider.w-25.border-gray-500.mb-3

        .row
          router-link.col.link-dark.text-decoration-none(
            v-for="article in articles" :key="article.id"
            :to="`/blog/${article.id}`")

            .row
              .col-4.col-md-4.text-cyan-600.d-flex.align-items-center
                | {{ $filters.date(article.create_at) }}
              h5.fs46.col-9.col-md-8.m-md-0.d-flex.align-items-center
                | {{ article.title }}
              .divider.d-md-none

    .col-4.mx-auto
      img.img-fluid(
        src="@/assets/images/coffee-grinder-svgrepo-com.svg"
          alt="A cup of coffee make a day!")
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      temparticle: {},
      pagination: {},
      currentPage: 1,
    };
  },
  methods: {
    async getArticles(page = 1) {
      this.currentPage = page;

      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`;

      try {
        const http = await fetch(api);
        const fetchData = await http.json();

        this.articles = fetchData.articles;
        this.pagination = fetchData.pagination;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
