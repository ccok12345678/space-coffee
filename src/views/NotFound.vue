<template lang="pug">
.container.pt-5
  .row.justify-content-center
    router-link.col-lg-4.col-md-6.col-8.text-center.text-gray-700.text-decoration-none(
      to="/" title="回首頁")
      img.img-fluid(
        src="@/assets/images/404-error-svgrepo-com.svg"
        alt="404 NOT FOUND")
      .fs-4.mt-3 OOPS! 這個頁面不存在
      .fs-6 （點擊回到宇宙咖啡）
</template>

<script>
export default {
  metaInfo: {
    title: '404 -Not Found',
  },
};
</script>
