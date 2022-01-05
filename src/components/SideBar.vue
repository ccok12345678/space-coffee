<template lang="pug">
nav.nav.navbar-dark.bg-dark
  .container
    a.d-block.navbar-brand.p-2.p-sm-3.p-md-4.text-center.m-0.mb-md-4(href="#/dashboard" title="後台")
      h1.m-0.fs-2 Space Coffee
      small.d-none.d-sm-inline-block Dashboard
    .nav-tabs.fs-5.text-center.border-0.d-flex.flex-row.flex-md-column.justify-content-center
      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(to="" title="管理商品")
        i.d-none.d-sm-inline-block.me-2.bi.bi-basket
        | 產品
      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(to="" title="管理訂單")
        i.d-none.d-sm-inline-block.me-2.bi.bi-card-checklist
        | 訂單
      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(
        to="" title="管理優惠卷")
        i.d-none.d-sm-inline-block.me-2.bi.bi-ticket
        | 優惠卷
      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(to="" title="Shop")
        i.d-none.d-sm-inline-block.me-2.bi.bi-shop
        | 商店
</template>

<style lang="scss" scoped>
$gray-100: #f8f9fa;

.nav {
    height: 100vh;

    @media (max-width: 768px) {
      height: auto;
    }
  }

.nav-link {
  color: $gray-100;
  position: relative;

  @media (max-width: 767.98px) {
    &:hover {
      color: black;
      background: $gray-100;
    }
  }

  @media (min-width: 768px) {
    &:hover {
      color: $gray-100;
      margin-left: 20px;
    }
    &-active::after {
      content: '';
      position: absolute;
      right: -1px;
      top: 10px;
      display: inline-block;
      border-left: none;
      border-right: 30px solid $gray-100;
      border-top: 20px solid transparent;
      border-bottom: 20px solid transparent;
    }
  }
}

</style>
