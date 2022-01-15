<template lang="pug">
section.container-lg.pb-4.mb-3.mb-sm-5.overflow-hidden.d-flex.flex-column.align-items-center
  img.img-fluid.d-none.d-md-block(src="https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80")
  img.d-block.d-md-none(src="https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80")
  .devider.w-75.border-gray-500.my-4
  .text-cyan-600.text-center.fs-5.font-monospace
    p 為了找到最好的咖啡
    p 我們願意
    p 飛越宇宙
section.container-lg.d-flex.flex-column.align-items-center.py-5.mb-5
  h3.fs-5.text-gray-600 宇航精選
  .devider.w-50.border-gray-500.mb-5
  .row.gy-2.w-100.d-flex.justify-content-center
    .col-md-4.d-none.d-md-flex.align-items-center
      img.img-fluid(src="https://images.unsplash.com/photo-1458819714733-e5ab3d536722?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")
    .col-md-8.col-12
      UserProductCard(:tempPick="randomPicks[2]")
      .row
        .col-sm-6.mt-3
          UserProductCard(:tempPick="randomPicks[3]")
        .col-sm-6.mt-3
          UserProductCard(:tempPick="randomPicks[4]")
    .w-100
    .col-md-8.col-12
      UserProductCard(:tempPick="randomPicks[1]")

</template>

<style lang="scss" scoped>
img {
  min-height: 351px;
  @media (max-width: 767.98px) {
    margin-top: 100px;
  }
}
</style>

<script>
import { sampleSize } from 'lodash';
import UserProductCard from '@/components/User_ProductCard.vue';

export default {
  data() {
    return {
      randomPicks: [],
    };
  },
  components: {
    UserProductCard,
  },
  props: {
    products: {
      type: Array,
      default() { return []; },
    },
  },
  watch: {
    products() {
      this.randomPicks = sampleSize(this.products, 5);
    },
  },
  created() {
    this.randomPicks = sampleSize(this.products, 6);
  },
};
</script>
