<template lang="pug">
a.btn.btn-secondary.btn-fixed.fs-3.hover-half-transparent.text-light.border-0(
  title="新增優惠卷" @click.prevent="openModal(true)")
  i.bi.bi-file-earmark-plus
section.w-100.overflow-auto.text-nowrap.text-center(v-if="!!coupons.length")
  table.table.table-sm.table-light.table-striped.table-hover.align-middle
    thead
      tr
        th 名稱
          i.bi.bi-pencil-square.ms-2
        th 代碼
        th 折數
        th 到期日
        th 啟用
        th
    tbody
      tr(v-for="coupon in coupons" :key="coupon.id")
        td
          a.link-dark.text-decoration-none(href="#" @click.prevent="openModal(false, coupon)")
            | {{ coupon.title }}
        td {{ coupon.code }}
        td {{ coupon.percent/10 }}折
        td {{ $filters.date(coupon.due_date) }}
        td
          .form-switch.text-center
            input#productEnabled.form-check-input.me-0.p-2.shadow-0(type="checkbox" role="switch"
              v-model="coupon.is_enabled" :true-value="1" :false-value="0"
              @change.prevent="updateCoupon(coupon)")
        td
          button.border-0.hover-gray.py-2.d-block.w-100(type="button" title="編輯"
            @click.prevent="openModal(false, coupon)")
            i.bi.bi-pencil-square
          button.border-0.hover-red.py-2.d-block.w-100(type="button" title="刪除"
            @click.prevent="checkDelete(coupon)")
            i.bi.bi-trash
Pagination(:pages="pagination" @emit-page="getCoupons")
CouponModal(ref="couponModal"
  :coupon="tempCoupon" @emit-coupon="updateCoupon")
DeleteModal(ref="deleteModal"
  :item="tempCoupon" :itemClass="'優惠卷'"
  @emit-delete="delCoupon")
VueLoading(:active="isLoading")
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import CouponModal from '@/components/Modal_Coupon.vue';
import DeleteModal from '@/components/Modal_Delete.vue';

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      currentPage: 1,
      isNew: false,
      isLoading: false,
    };
  },
  components: {
    Pagination,
    CouponModal,
    DeleteModal,
  },
  inject: ['tokenValue'],
  methods: {
    async getCoupons(page = 1) {
      this.isLoading = true;
      this.currentPage = page;

      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      const http = await fetch(api, {
        headers: { Authorization: this.tokenValue },
      });
      const data = await http.json();
      this.coupons = data.coupons;
      this.pagination = data.pagination;
      console.log('coupons', data);
      this.isLoading = false;
    },
    openModal(isNew, coupon) {
      this.isNew = isNew;

      if (isNew) {
        this.tempCoupon = {};
      } else {
        this.tempCoupon = { ...coupon };
      }
      this.$refs.couponModal.showModal();
    },
    async updateCoupon(coupon) {
      this.$refs.couponModal.hideModal();
      let api; let method; let page;

      if (this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
        method = 'post';
        page = 1;
      } else {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`;
        method = 'put';
        page = this.currentPage;
      }
      const couponData = { data: { ...coupon } };
      const http = await fetch(api, {
        method,
        headers: {
          Authorization: this.tokenValue,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponData),
      });

      try {
        const data = await http.json();
        console.log('update coupon', data);
        this.getCoupons(page);
      } catch (error) {
        console.error(error);
      }
      this.isNew = false;
    },
    checkDelete(item) {
      this.tempCoupon = { ...item };
      this.$refs.deleteModal.showModal();
    },
    async delCoupon(coupon) {
      console.log('delete', coupon);
      this.$refs.deleteModal.hideModal();
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`;
      const http = await fetch(api, {
        method: 'delete',
        headers: { Authorization: this.tokenValue },
      });
      const data = await http.json();
      console.log('delete coupon', data);
      if (data.success) {
        this.getCoupons(this.currentPage);
      }
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
