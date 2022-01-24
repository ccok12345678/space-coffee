<template lang="pug">
.container-lg.d-flex.flex-column.align-items-center.my-5
  .row.gy-4.w-80.placeholder-wave
    .col-6.placeholder(:class="`bg-${bgColor}`")
    .col-6
    .col-5.placeholder(:class="`bg-${bgColor}`")
    .col-7
    .col-8.placeholder(:class="`bg-${bgColor}`")
    .col-4
    .col-5.placeholder(:class="`bg-${bgColor}`")
    .col-7
    .col-10.placeholder(:class="`bg-${bgColor}`")
    .col-2
    .col-10.placeholder(:class="`bg-${bgColor}`")
    .col-2
    .col-8.placeholder(:class="`bg-${bgColor}`")
    .col-4
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default() { return 'gray-300'; },
    },
  },
};
</script>
