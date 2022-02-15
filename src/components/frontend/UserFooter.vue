<template lang="pug">
footer.bg-gray-200.font-monospace
  .container-lg
    .row

      .col-md-4.d-flex.flex-column.px-5.px-md-4.pt-5.pb-3.py-md-5
        h6.text-gray-600.mb-4.mx-auto.mx-md-0.text-cyan-800 訂閱宇宙電報
        form.w-75.w-md-100.mx-auto.mx-md-0
          label.form-label.visually-hidden 請輸入信箱：
          input.form-control.form-control-sm.ms-3.mb-2.rounded-0(type="email"
            placeholder="Email Address" disabled)
          button.btn.btn-gray-300.btn-sm.ms-3(type="submit" disabled) Subscribe

      .devider.w-50.mx-auto.px-5.my-4.d-block.d-md-none

      .col-md-4.d-flex.flex-column.px-5.px-md-2.py-3.py-md-5.text-center.text-md-start
        h6.text-gray-600.mb-3.text-cyan-800 尋找宇宙咖啡

        ul.nav.mx-auto.mx-md-0

          li.nav-item
            a.nav-link.py-1.link-cyan-400.bi.bi-twitter(href="https://twitter.com/hexschool1"
              title="在 Twitter Follow 宇宙咖啡")

          li.nav-item
            a.nav-link.py-1.link-orange-600.bi.bi-envelope-fill(href="mailto:ccok12345678@gmail.com"
              title="聯絡宇宙咖啡 ✉️")

          li.nav-item
            a.nav-link.py-1(href="tel:+886-1111111"
              title="聯絡宇宙咖啡 📡")
              img(src="@/assets/images/broadcast.svg" height="25")

        ul.list-group.list-group-flush.ps-3.mt-2.fs-12
          li.list-group-item.px-0.border-0
            small.text-muted Address: 火衛二中山路二段324號
          li.list-group-item.px-0
            small.text-muted
              |Phone:
              a.text-muted.text-decoration-none(href="tel:+44556-7655555"
                title="撥打電話") +44556-7655555

      .devider.w-50.mx-auto.px-5.mt-4.d-block.d-md-none.border-cyan-800

      .col-md-4.d-flex
        .display-3.text-brand.text-nowrap.py-5.m-auto.text-cyan-800
          | Space Coffee

    .devider.w-100.mx-auto.my-3.border-gray-500

    .text-gray-500.text-center.w-75.mx-auto.d-flex.justify-content-between.flex-column.flex-md-row

      .pb-md-3 ©2022
        a.link-gray-600.text-decoration-none.ms-2(href="#/login"
        target="_blank" title="管理者登入") Space Coffee,

      .pb-3 made by ccok.

</template>
