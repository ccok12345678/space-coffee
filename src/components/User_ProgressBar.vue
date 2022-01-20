<template lang="pug">
.progress-bar.flex-nowarp.mx-auto.mb-4.text-nowrap
  //- step 1
  .d-flex.flex-column.align-items-center
    .rounded-circle.text-light.circle.bg-secondary.d-flex(
      :class="{ 'bg-info': status.isCart }")
      .m-auto 1
    .text-gray-700.fs-12.mt-2.mx-1 購物車

  .d-flex.mb-4
    .bar.m-auto.border-secondary(:class="{ 'border-info': status.isOrder }")

  //- step 2
  .d-flex.flex-column.align-items-center
    .rounded-circle.text-light.circle.bg-secondary.d-flex(
      :class="{ 'bg-info': status.isOrder }")
      .m-auto 2
    .text-gray-700.fs-12.mt-2 填寫資料

  .d-flex.mb-4
    .bar.m-auto.border-secondary(:class="{ 'border-info': status.isCheck }")

  //- step 3
  .d-flex.flex-column.align-items-center
    .rounded-circle.text-light.circle.bg-secondary.d-flex(
      :class="{ 'bg-info': status.isCheck }")
      .m-auto 3
    .text-gray-700.fs-12.mt-2 建立訂單

  .d-flex.mb-4
      .bar.m-auto.border-secondary(:class="{ 'border-info': isPaid }")

  //- step 4
  .d-flex.flex-column.align-items-center
    .rounded-circle.text-light.circle.bg-secondary.d-flex(
      :class="{ 'bg-info': isPaid }")
      .m-auto 4
    .text-gray-700.fs-12.mt-2 付款完成

</template>

<style lang="scss" csoped>
$circle-size: 35px;
$circle-size-sm: 25px;
.progress-bar {
  display: flex;

  @media (max-width:374.98px) {
    display: none;
  }
}
.circle {
  width: $circle-size;
  height: $circle-size;
  font-size: 1.5rem;

  @media (max-width: 576px) {
    width: $circle-size-sm;
    height: $circle-size-sm;
    font-size: 1rem;
  }
}
.bar {
  width: 55px;
  height: 0;
  border-top: 3px solid rgb(52, 204, 241);

  @media (max-width:576px) {
    width: 35px;
    border-width: 1.75px;
  }
}

</style>

<script>
export default {
  data() {
    return {
      status: {
        isCart: true,
        isOrder: false,
        isCheck: false,
      },
      isPay: false,
    };
  },
  props: {
    step: {
      type: String,
      default() { return ''; },
    },
    isPaid: {
      type: Boolean,
      default() { return false; },
    },
  },
  created() {
    console.log('step', this.step);
    switch (this.step) {
      case 'Cart':
        this.status.isCart = true;
        this.status.isOrder = false;
        this.status.isCheck = false;
        break;
      case 'Order':
        this.status.isCart = true;
        this.status.isOrder = true;
        this.status.isCheck = false;
        break;
      case 'Check':
        this.status.isCart = true;
        this.status.isOrder = true;
        this.status.isCheck = true;
        break;
      default:
        this.status.isCart = false;
        this.status.isOrder = false;
        this.status.isCheck = false;
        break;
    }
  },
};
</script>
