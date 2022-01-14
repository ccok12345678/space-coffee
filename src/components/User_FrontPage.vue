<template lang="pug">
.container-lg.pb-4.mb-3.mb-sm-5.overflow-hidden.d-flex.justify-content-center
  img.img-fluid.d-none.d-md-block(src="https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80")
  img.d-block.d-md-none(src="https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80")
section.container-lg.d-flex.flex-column.align-items-center.py-5.mb-5
  h3.fs-5.text-gray-600 宇宙精選
  .devider.w-50.border-gray-500.mb-5
  UserProductCards(:tempPicks="randomPicks")
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
import UserProductCards from '@/components/User_ProductCards.vue';

export default {
  data() {
    return {
      randomPicks: [],
    };
  },
  components: {
    UserProductCards,
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
      console.log('in watch', this.randomPicks);
    },
  },
  created() {
    this.randomPicks = sampleSize(this.products, 6);
    console.log('in life', this.randomPicks);
  },
};
</script>
