<template lang="pug">
nav.mt-3(v-if="pages.total_pages > 1")
  ul.pagination.justify-content-center
    li.page-item(v-if="pages.has_pre")
      a.page-link(href="#"
        @click.prevent="changePage(pages.current_page - 1)")
        span ⫷
    li.page-item(v-for="page in pages.total_pages" :key="page"
    :class="{ 'active': page === pages.current_page }")
      a.page-link(href="#"
        @click.prevent="changePage(page)"
      ) {{ page }}
    li.page-item(v-if="pages.has_next")
      a.page-link(href="#"
      @click.prevent="changePage(pages.current_page + 1)")
        span ⫸
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    changePage(page) {
      this.$emit('emit-page', page);
      document.querySelector('#table-container')
        .scrollTop = 10;
    },
  },
};
</script>
