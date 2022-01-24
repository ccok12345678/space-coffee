<template lang="pug">
a.btn.btn-secondary.btn-fixed.fs-3.hover-half-transparent.text-light.border-0(
  title="新增品項" @click.prevent="openModal(true)")
  i.bi.bi-clipboard-plus

section.w-100.overflow-auto.text-nowrap(v-if="!!products.length")

  table.table.table-sm.table-light.table-striped.table-hover.align-middle.text-center

    thead
      tr
        th 縮圖
        th
          | 商品名稱
          i.bi.bi-pencil-square.ms-2
        th.d-none.d-sm-table-cell 分類
        th 售價
        th.d-none.d-sm-table-cell 原價
        th.d-none.d-sm-table-cell(width="50") 上架
        th

    tbody

      tr(v-for="item in products" :key="item.id")
        td
          .img.overflow-hidden
            img.img-fluid(:src="item.imageUrl")

        td
          a.link-dark.text-decoration-none(href="#"
            @click.prevent="openModal(false, item)" title="編輯察看")
            | {{ item.title }}

        td.d-none.d-sm-table-cell {{ item.category }}

        td ${{ $filters.currency(item.price) }}

        td.d-none.d-sm-table-cell ${{ $filters.currency(item.origin_price) }}

        td.d-none.d-sm-table-cell
          .form-switch.text-center
            input#productEnabled.form-check-input.me-0.p-2.shadow-0(type="checkbox" role="switch"
              v-model="item.is_enabled" true-value="1" false-value="0"
              @change="updateProduct(item)")

        td
          button.border-0.hover-gray.py-2.px-2.d-block.w-100(
            type="button" title="編輯"
            @click.prevent="openModal(false, item)")
            i.bi.bi-pencil-square
          button.border-0.hover-red.py-2.px-2.d-block.w-100(
            type="button" title="刪除"
            @click.prevent="checkDelete(item)")
            i.bi.bi-trash

Pagination(:pages="pagination" @emit-page="getProducts")

ProductModal(ref="productModal"
  :product="tempProduct"
  @updateProduct="updateProduct")

DeleteModal(ref="deleteModal"
  :item="tempProduct" :itemClass="'商品'"
  @emit-delete="delProduct")

VueLoading(:active="isLoading")

</template>

<script>
import Pagination from '@/components/Pagination.vue';
import ProductModal from '@/components/Modal_Product.vue';
import DeleteModal from '@/components/Modal_Delete.vue';

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      currentPage: 1,
      isNew: false,
      isLoading: false,
    };
  },
  components: {
    Pagination,
    ProductModal,
    DeleteModal,
  },
  inject: ['tokenValue', 'pushToast'],
  methods: {
    async getProducts(page = 1) {
      this.isLoading = true;

      this.currentPage = page;

      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${this.currentPage}
      `;
      try {
        const http = await fetch(api, {
          headers: { Authorization: this.tokenValue },
        });
        const fetchData = await http.json();

        this.products = fetchData.products;
        this.pagination = fetchData.pagination;
      } catch (error) {
        console.error(error);
      }
      this.isLoading = false;
    },

    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }

      this.isNew = isNew;
      this.$refs.productModal.showModal();
    },

    async updateProduct(product) {
      this.$refs.productModal.hideModal();

      let api; let method; let page;

      if (this.isNew) {
        api = `
          ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
        method = 'post'; page = 1;
      } else {
        api = `
          ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${product.id}
        `;
        method = 'put'; page = this.currentPage;
      }

      const http = await fetch(api, {
        method,
        headers: {
          Authorization: this.tokenValue,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { ...product } }),
      });
      const fetchData = await http.json();

      this.getProducts(page);
      this.pushToast(fetchData, '產品');

      this.isNew = false;
    },

    checkDelete(item) {
      this.tempProduct = { ...item };
      this.$refs.deleteModal.showModal();
    },

    async delProduct(item) {
      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}
      `;

      try {
        const http = await fetch(api, {
          method: 'delete',
          headers: { Authorization: this.tokenValue },
        });
        const data = await http.json();

        this.pushToast(data, '產品');
        this.getProducts(this.currentPage);
      } catch (error) {
        console.error(error);
      }

      this.$refs.deleteModal.hideModal();
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
