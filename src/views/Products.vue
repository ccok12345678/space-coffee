<template lang="pug">
a.btn.btn-secondary.btn-fixed.fs-3.hover-half-transparent.border-0(
  title="新增品項"
)
  | +
section.w-100.overflow-auto.text-nowrap(v-if="!!products.length")
  table.table.table-sm.table-light.table-striped.table-hover.align-middle
    thead
      tr
        th 縮圖
        th 名稱
        th.d-none.d-sm-table-cell 分類
        th.text-center 售價
        th.text-center.d-none.d-sm-table-cell 原價
        th(width="50") 上架
        th
    tbody
      tr(v-for="item in products" :key="item.id")
        td
          .img.overflow-hidden
            img.img-fluid(:src="item.imageUrl")
        td
          a.link-gray-600.text-decoration-none(href="#")
            | {{ item.title }}
        td.d-none.d-sm-table-cell {{ item.category }}
        td.text-end {{ $filters.currency(item.price) }}
        td.text-end.d-none.d-sm-table-cell {{ $filters.currency(item.origin_price) }}
        td.text-center
          .form-switch.text-center
            input#productEnabled.form-check-input.me-0.shadow-0(type="checkbox" role="switch"
              v-model="item.is_enabled" true-value="1" false-value="0")
        td.text-center
          button.border-0.hover-gray.py-2.px-2.d-block.w-100(type="button" title="編輯")
            i.bi.bi-pencil-square
          button.border-0.hover-red.py-2.px-2.d-block.w-100(type="button" title="刪除") X
Pagination(:pages="pagination" @emit-page="getProducts")
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  inject: ['tokenValue'],
  methods: {
    async getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      const http = await fetch(api, {
        headers: { Authorization: this.tokenValue },
      });

      try {
        const data = await http.json();
        this.products = data.products;
        this.pagination = data.pagination;
        console.log('products', this.products);
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.img {
  max-width: 50px;
  max-height: 50px;
}
</style>
