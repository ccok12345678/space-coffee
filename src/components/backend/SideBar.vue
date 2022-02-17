<template lang="pug">
nav.nav.navbar-dark.bg-dark
  .container.d-flex.flex-md-column

    //- offcanvas button
    a.link-light.fs-1.btn.d-md-none.my-auto(data-bs-toggle="offcanvas"
      href="#sideBarOffcanvas"
      title="開啟選單列")
      i.bi-.bi-list

    //- brand logo
    a.d-block.navbar-brand.text-brand.p-2.p-sm-3.p-md-4.text-center.m-auto.m-md-0.mb-md-4(
      href="#/dashboard" title="後台")
      h1.m-0.fs-2 Space Coffee
      small.d-none.d-sm-inline-block Dashboard

    .nav-tabs.fs-5.text-center.border-0.d-none.d-md-flex.flex-column.justify-content-center

      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(title="管理商品"
        to="/dashboard/products"
        :class="{ 'nav-link-active': $route.name === 'Products' }")
        i.d-none.d-sm-inline-block.me-2.bi.bi-basket
        | 產品

      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(title="管理訂單"
        to="/dashboard/orders"
        :class="{ 'nav-link-active': $route.name === 'Orders' }")
        i.d-none.d-sm-inline-block.me-2.bi.bi-card-checklist
        | 訂單

      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(title="管理優惠卷"
        to="/dashboard/coupons"
        :class="{ 'nav-link-active': $route.name === 'Coupons' }")
        i.d-none.d-sm-inline-block.me-2.bi.bi-ticket
        | 優惠卷

      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(title="管理文章"
        to="/dashboard/articles"
        :class="{ 'nav-link-active': $route.name === 'Articles' }")
        i.d-none.d-sm-inline-block.me-2.bi.bi-chat-right-text
        | 部落格

      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(
        :to="{name: 'Home' }" target="_blank" title="前往商店")
        i.d-none.d-sm-inline-block.me-2.bi.bi-shop
        | 商店

      button.nav-item.nav-link.py-2.px-0.px-sm-1.py-md-3(title="登出"
        @click="logOut")
        i.bi.bi-box-arrow-left.me-2
        span.d-none.d-md-inline-block 登出

    footer.d-flex.flex-column.p-3.mt-auto.d-none.d-md-block
      .devider.w-75.border-secondary.mx-auto
      small.text-muted.pt-2.mx-auto © 2022 Space coffee, made by ccok

//- offcanvas nav content
aside#sideBarOffcanvas.offcanvas.offcanvas-end.bg-dark(tabindex="-1"
ref="sidebarOffcanvas")

  .offcanvas-header.text-light.d-flex
    .fs-4.text-brand.m-auto Dashboard
    button.btn.text-light.fs-4(data-bs-dismiss="offcanvas" aria-label="Close" title="關閉選單")
      i.bi.bi-x-square

  .offcanvas-body

    .nav-tabs.fs-5.text-center.border-0.d-flex.flex-column.justify-content-center(
      data-bs-dismiss="offcanvas" aria-label="Close"
    )

      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(title="管理商品"
        to="/dashboard/products"
        :class="{ 'nav-link-active': $route.name === 'Products' }")
        i.me-2.bi.bi-basket
        | 產品

      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(title="管理訂單"
        to="/dashboard/orders"
        :class="{ 'nav-link-active': $route.name === 'Orders' }")
        i.me-2.bi.bi-card-checklist
        | 訂單

      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(title="管理優惠卷"
        to="/dashboard/coupons"
        :class="{ 'nav-link-active': $route.name === 'Coupons' }")
        i.me-2.bi.bi-ticket
        | 優惠卷

      router-link.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(title="管理文章"
        to="/dashboard/articles"
        :class="{ 'nav-link-active': $route.name === 'Articles' }")
        i.me-2.bi.bi-chat-right-text
        | 部落格

      a.nav-item.nav-link.py-2.py-md-3.hover-bg-gray(
        href="/space-coffee/dist/" target="_blank" title="前往商店")
        i.me-2.bi.bi-shop
        | 商店

      button.nav-item.nav-link.py-2.px-0.px-sm-1.py-md-3(
        type="button"
        title="登出"
        @click="logOut")
        i.bi.bi-box-arrow-left.me-2
        span 登出

  footer.text-center.p-3.mt-auto
    small.text-muted.border-top.pt-2 © 2022 Space coffee, made by ccok

</template>

<script>
export default {
  data() {
    return {
      pageTitle: '',
    };
  },
  inject: ['tokenValue'],
  methods: {
    async logOut() {
      const api = `${process.env.VUE_APP_API}/logout`;

      try {
        const http = await fetch(api, {
          method: 'post',
          headers: { Authorization: this.tokenValue },
        });
        const data = await http.json();
        if (data.success) {
          window.self.location.assign('/space-coffee/dist/#/login');
        }
      } catch (error) {
        console.error(error);
      }
    },
    hideOffcanvas() {
      this.offcanvas.hide();
    },
  },
};
</script>

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
    &-active {
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
