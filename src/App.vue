<template lang="pug">
router-view

metainfo
  template(v-slot:title="{ metainfo }")
    | {{ metainfo.titleTemplate(metainfo.title) }}
</template>

<script>
export default {
  metaInfo: {
    title: '',
    titleTemplate: (chunk) => (chunk ? `${chunk} | 宇宙咖啡 Space Coffee` : '宇宙咖啡 Space Coffee · 瀰漫宇宙的咖啡香'),
  },
};
</script>

<style lang="scss">
@import "assets/scss/all";
</style>
