<template lang="pug">
section.container-lg.pb-4.mb-3.mb-sm-5.overflow-hidden.d-flex.flex-column.align-items-center

  Banner

  UserPromotions.w-100

  UserRecomend.w-100(:products="products")

  main.text-cyan-600.text-center.fs-5.mt-3.mb-5
    p 為了找到最好的咖啡，
    p 我們願意
    p.mb-0 飛越宇宙

  .banner.w-100.bg-cover.p-5.text-center.mb-2
    .p-5.my-5.display-1.text-light.text-brand.d-none.d-md-block
      | Coffee Or Die
    .p-4.my-5.display-3.text-light.text-brand.d-md-none
      | Coffee Or Die

.container-lg.text-md-start.text-center
  h4.text-info.text-brand Subscribe for discount now! 🪐

</template>

<script>
import Banner from '@/components/frontend/Banner.vue';
import UserRecomend from '@/components/frontend/UserRecomend.vue';
import UserPromotions from '@/components/frontend/UserPromotions.vue';

export default {
  components: {
    Banner,
    UserRecomend,
    UserPromotions,
  },
  props: {
    products: {
      type: Array,
      default() { return []; },
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  background-image: url('../../assets/photos/banner-background.jpg');
}
</style>
