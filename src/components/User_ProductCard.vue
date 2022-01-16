<template lang="pug">
a.item-box.bg-cover.text-light.text-decoration-none.border(
  :style="`background-image: url(${tempPick.imageUrl}};`"
  @click.prevent="toProduct" href="#")
  .item-box-caption.py-2.w-100.pt-4.text-center.vstack
    span {{ tempPick.category }}：
    span {{ tempPick.title }}
    span $ {{ $filters.currency(tempPick.price) }} / {{ tempPick.unit }}
    button.btn.btn-outline-light.w-25.mt-1.mx-auto(type="button")
      | 購買
</template>

<style lang="scss" scoped>
.item-box {
  display: flex;
  width: 100%;
  height: 250px;
  overflow: hidden;

  &-caption {
    background: rgba(0, 0, 0, 0.5);
    transition: .3s ease;
    transform: translateY(100px);

    @media (min-width: 768px) {
      transform: translateY(250px);
    }
  }
}
.item-box:hover  {
    .item-box-caption {
      backdrop-filter: blur(3px);

      @media (min-width: 576px) {
        transform: translateY(100px);
      }
    }
  }
</style>

<script>
export default {
  props: {
    tempPick: {
      type: Object,
      default() { return {}; },
    },
  },
  methods: {
    toProduct() {
      this.$router.push(`/product/${this.tempPick.id}`);
      window.scroll({
        top: 100,
        behavior: 'smooth',
      });
    },
  },
};
</script>
