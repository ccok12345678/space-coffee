<template lang="pug">
.btn-group-vertical.btn-fixed
  button.btn.btn-secondary.text-light.border-0.p-2.px-3.mb-1(
    title="購物車" class="hover-half-transparent-cyan"
    @click.prevent="goCart" type="button"
  )
    i.bi.bi-cart3
  button.btn.btn-secondary.hover-half-transparent-cyan.text-light.border-0.p-2.px-3(
    title="回到頂端" @click.prevent="scrollTop" type="button"
  )
    i.bi.bi-arrow-up-circle
</template>

<style lang="scss">
</style>

<script>
export default {
  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    goCart() {
      console.log('GO CART!!');
    },
  },
};
</script>
