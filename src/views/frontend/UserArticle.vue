<template lang="pug">
//- placeholder
Placeholder(:bgColor="'gray-500'" v-if="isLoading")

article.container-lg.d-flex.flex-column.align-items-center.my-5(v-if="!isLoading")

  h3.fs-4.text-gray-600 {{ article.title }}

  .devider.w-50.border-gray-500.mb-3

  .row.justify-content-center.w-100

    p.col-md-8.text-gray-500
      | {{ article.description }}

    .col-sm-8.mb-3(v-if="!!article.image")
      img.img-fluid(:src="article.image" :title="article.title")

    p.col-md-8
      | {{ article.content }}

    .col-12.col-md-8.devider.border-gray-500.mb-3

    .col-md-8.mb-2.text-gray-600
      small 編輯日期：{{ $filters.date(article.create_at) }}

    .col-md-8.text-gray-500
      small 標籤：
      small.me-2(v-for="(tag, key) in article.tag" :key="key") {{ tag }}

</template>

<script>
import Placeholder from '@/components/Placeholder.vue';

export default {
  data() {
    return {
      article: {},
      isLoading: false,
    };
  },
  components: {
    Placeholder,
  },
  methods: {
    async getArticle() {
      this.isLoading = true;

      const { articleId } = this.$route.params;

      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${articleId}
      `;

      try {
        const http = await fetch(api);
        const fetchData = await http.json();
        this.article = fetchData.article;
      } catch (error) {
        console.error(error);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.getArticle();
  },
  updated() {
    document.title = `${this.article.title}｜宇宙咖啡`;
  },
};
</script>

<style lang="scss" scoped>
p {
  white-space: pre-wrap;
}
</style>
