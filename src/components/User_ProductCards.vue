<template lang="pug">
.row.w-100.gy-5.d-flex.justify-content-center
  .col-md-4.col-sm-6.col-12(v-for="item in tempPicks" :key="item.id")
    a.item-box.bg-cover.text-light.text-decoration-none(href="#"
      :style="`background-image: url(${item.imageUrl}};`")
      div.item-box-caption.py-2.w-100.pt-4.text-center
        | {{ item.category }}： #[br]
        | {{ item.title }}
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
    tempPicks: {
      type: Array,
      default() { return []; },
    },
  },
};
</script>
