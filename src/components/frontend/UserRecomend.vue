<template lang="pug">
section.d-flex.flex-column.align-items-center.py-5.mb-3

  h3.fs-5.text-gray-600 宇航精選

  .divider.w-50.border-gray-500.mb-5

  .row.gy-4.w-100

    .col-md-4.col-sm-6.col-12
      .d-none.d-md-block.py-5
      UserProductCard.mb-4(:tempPick="randomPicks[0]")
      UserProductCard(:tempPick="randomPicks[1]")

    .col-md-4.col-sm-6.col-12
      UserProductCard.mb-4.mb-md-0(:tempPick="randomPicks[2]")
      .p-4.text-center.d-none.d-md-block
        img.img-fluid(src="@/assets/images/satellite.png"
          alt="satellite image")
      UserProductCard(:tempPick="randomPicks[3]")

    .col-md-4.d-none.d-md-block
      .d-none.d-md-block.py-5
      UserProductCard.mb-4(:tempPick="randomPicks[4]")
      UserProductCard(:tempPick="randomPicks[5]")

</template>

<script>
import { sampleSize } from 'lodash';
import UserProductCard from '@/components/frontend/UserProductCard.vue';

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
      this.randomPicks = sampleSize(this.products, 6);
    },
  },
  created() {
    this.randomPicks = sampleSize(this.products, 6);
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 150px;
  width: 150px;
}
</style>
