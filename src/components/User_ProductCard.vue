<template lang="pug">
a.item-box.bg-cover.text-light.text-decoration-none.border(href="#"
  :style="`background-image: url(${tempPick.imageUrl}};`")
  span.item-box-caption.py-2.w-100.pt-4.text-center
    | {{ tempPick.category }}： #[br]
    | {{ tempPick.title }}
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
    transform: translateY(160px);

    @media (min-width: 768px) {
      transform: translateY(250px);
    }
  }
}
.item-box:hover  {
    .item-box-caption {
      backdrop-filter: blur(3px);

      @media (min-width: 576px) {
        transform: translateY(160px);
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
