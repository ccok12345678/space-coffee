<template lang="pug">
a.btn.btn-secondary.btn-fixed.fs-3.hover-half-transparent.text-light.border-0(
  title="新增品項" @click.prevent="openModal(true)")
  i.bi.bi-file-earmark-plus
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
          .form-switch.text-center
            input#productEnabled.form-check-input.me-0.shadow-0(type="checkbox" role="switch"
              v-model="coupon.is_enabled" true-value="1" false-value="0")
        td
          button.border-0.hover-gray.py-2.d-block.w-100(type="button" title="編輯"
            @click.prevent="openModal(coupon)")
            i.bi.bi-pencil-square
          button.border-0.hover-red.py-2.d-block.w-100(type="button" title="刪除")
            i.bi.bi-trash
Pagination(:pages="pagination" @emit-page="getCoupons")
CouponModal(ref="couponModal"
  :coupon="tempCoupon")
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import CouponModal from '@/components/Modal_Coupon.vue';

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
    };
  },
  components: {
    Pagination,
    CouponModal,
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
    openModal(coupon) {
      this.tempCoupon = { ...coupon };
      this.$refs.couponModal.showModal();
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
