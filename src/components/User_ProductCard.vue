<template lang="pug">
router-link.item-box.bg-cover.text-light.text-decoration-none.border(href="#"
  :style="`background-image: url(${tempPick.imageUrl}};`"
  :to="`/product/${tempPick.id}`")
  .item-box-caption.py-2.w-100.pt-4.text-center.vstack
    span {{ tempPick.category }}：
    span {{ tempPick.title }}
    span $ {{ $filters.currency(tempPick.price) }} / {{ tempPick.unit }}
    button.btn.btn-outline-light.btn-sm.mt-1.mx-5(type="button")
      i.bi.bi-cart
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
};
</script>
