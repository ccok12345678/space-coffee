<template lang="pug">
section.d-flex.flex-column.align-items-center.py-5.mb-3

  .row.w-100

    .col-md-4
      img.img-fluid(src="@/assets/images/alien_octopus.png")

    .col-md-8.d-flex.flex-column.justify-content-center.align-items-center

      .text-start
        h3.fs-5.text-gray-600.mb-3
          | 宇航收集者：收藏商品獲得最佳優惠！
        p.mb-0 活動辦法：
        p.mb-0
          | 只要將6件商品加入收藏清單，#[br.d-inline.d-sm-none]就能獲得專屬優惠碼，
        p
          | 快去收藏清單確認吧！
        router-link.btn.btn-outline-cyan(
          to="/favorites"
          title="前往收藏清單")
          | 前往收藏清單
          img.ms-1(src="@/assets/images/rocket-svgrepo-com.svg"
            width="16"
            alt="rocket")

</template>

<style lang="scss" scoped>
.btn:hover {
  color: #0caccc;
  background: #fff;
  border: 1px solid #0caccc;

  img {
    margin-bottom: 5px;
  }
}
</style>
