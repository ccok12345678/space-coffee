<template lang="pug">
nav.nav.navbar-dark.bg-dark
  .container
    a.d-block.navbar-brand.p-3.text-center.m-0(href="#/dashboard")
      h1.m-0.fs-3 Space Coffee☕
    .nav-tabs.fs-5.text-center.border-0.d-flex.flex-row.flex-md-column.justify-content-center
      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(to="" title="Products") 產品
      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(to="" title="Orders") 訂單
      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(to="" title="Coupons") 優惠卷
      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(to="" title="Shop") 商店
</template>

<style lang="scss" scoped>
.nav {
    height: 100vh;

    @media (max-width: 768px) {
      height: auto;
    }
  }

.nav-link {
  color: #dee2e6;

  &:hover {
    background: #e9ecef;
    color: black;
  }
}

</style>
