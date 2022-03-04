<template lang="pug">
section.container-lg.pb-4.mb-3.mb-sm-5.overflow-hidden.d-flex.flex-column.align-items-center

  Banner

  .devider.w-75.border-gray-500.my-4

  main.text-cyan-600.text-center.fs-5.mt-5
    p 為了找到最好的咖啡，
    p 我們願意
    p.mb-0 飛越宇宙

UserRecomend(:products="products")

.container-lg.text-md-start.text-center
  h4.text-info.text-brand Subscribe for discount now! 🪐

</template>

<script>
import Banner from '@/components/frontend/Banner.vue';
import UserRecomend from '@/components/frontend/UserRecomend.vue';

export default {
  components: {
    Banner,
    UserRecomend,
  },
  props: {
    products: {
      type: Array,
      default() { return []; },
    },
  },
};
</script>
