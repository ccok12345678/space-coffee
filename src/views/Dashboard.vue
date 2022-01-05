<template lang="pug">
.bg-gray
  .row.gx-0
    .col-md-3
      SideBar
    .col-md-9.p-1.p-sm-2.p-md-4
      router-view
</template>

<style lang="scss" scoped>
.bg-gray {
  background: #f8f9fa;
}
</style>

<script>
import SideBar from '@/components/SideBar.vue';

export default {
  components: {
    SideBar,
  },
};
</script>
