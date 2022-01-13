<template lang="pug">
.header-topbar.text-light.bg-dark
  .container.d-flex
    ul.nav.d-none.d-lg-flex
      li.nav-item
        a.nav-link.py-1.link-gray-600.bi.bi-twitter(href="https://twitter.com/hexschool1"
          title="在 Twitter Follow 宇宙咖啡")
      li.nav-item
        a.nav-link.py-1.link-gray-600.bi.bi-envelope-fill(href="mailto:ccok12345678@gmail.com"
          title="聯絡宇宙咖啡 ✉️")
      li.nav-item
        a.nav-link.py-1(href="teleport:+886-1111111"
          title="聯絡宇宙咖啡 📡")
          img(src="../assets/images/broadcast.svg" height="25")
    ul.nav.ms-auto
      li.nav-item.ms-auto
        a.nav-link.py-1.link-gray-300.bi.bi-heart-fill(href="#" title="收藏")
      li.nav-item
        a.nav-link.py-1.link-gray-300.bi.bi-cart3(href="#"
          title="購物車")
</template>
