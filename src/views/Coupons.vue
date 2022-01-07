<template lang="pug">
a.btn.btn-secondary.btn-fixed.fs-3.hover-half-transparent.border-0(
  title="新增優惠卷"
)
  | +
section.w-100.overflow-auto.text-nowrap.text-center(v-if="!!coupons.length")
  table.table.table-sm.table-light.table-striped.table-hover.align-middle
    thead
      tr
        th 名稱
        th 代碼
        th 折數
        th 到期日
        th 啟用
        th
    tbody
      tr(v-for="coupon in coupons" :key="coupon.id")
        td {{ coupon.title }}
        td {{ coupon.code }}
        td {{ coupon.percent/10 }}折
        td {{ $filters.date(coupon.due_date) }}
        td
          span.text-success(v-if="coupon.is_enabled") 啟用
          span.text-mute(v-else) 未啟用
        td
          button.border-0.hover-gray.py-2.d-block.w-100(type="button" title="編輯")
            i.bi.bi-pencil-square
          button.border-0.hover-red.py-2.d-block.w-100(type="button" title="刪除") X
Pagination(:pages="pagination" @emit-page="getCoupons")
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      coupons: [],
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  inject: ['tokenValue'],
  methods: {
    async getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      const http = await fetch(api, {
        headers: { Authorization: this.tokenValue },
      });
      const data = await http.json();
      this.coupons = data.coupons;
      this.pagination = data.pagination;
      console.log('coupons', data);
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
