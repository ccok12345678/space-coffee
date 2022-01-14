<template lang="pug">
header.fixed-top-sm
  UserTopbar
  nav.navbar.navbar-expand-md.navbar-light
    .container.d-flex.flex-md-column.align-items-center
      a.navbar-brand.text-brand(href="/")
        h1 Space Coffee #[span.visually-hidden 宇宙咖啡]
      button#navbarToggler.navbar-toggler.border-0.d-flex.d-md-none(
      type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarContent" aria-controls="navbarContent"
      aria-expanded="false" aria-label="Toggle navigation")
          small.fw-bold.my-auto.me-1.text-black.text-spacing-sm MENU
          span.navbar-toggler-icon
      #navbarContent.navbar-collapse.collapse
        .navbar-nav.px-4.border-top
          .nav-item.mx-2
            a(href="/").nav-link.link-gray-500.hover-text-gray
              | 首頁
          hr.me-5.my-0.d-md-none
          #navAccordion.accordion.accordion-flush.d-flex.flex-column.flex-md-row
            .accordion-item.border-0.mx-2
              a#area.nav-link.link-gray-500.accordion-button.py-2.hover-text-gray.collapsed(
                href="#coffeeArea" data-bs-toggle="collapse" role="button")
                | 咖啡產區
              #coffeeArea.collapse.vstack(data-bs-parent="#navAccordion")
                router-link.link-gray-500.text-decoration-none.ps-2.py-1.hover-text-gray(
                  to="/" v-for="(area, key) in areas" :key="key")
                  | {{ area }}
            hr.me-5.my-0.d-md-none
            .accordion-item.mx-2
              a#roast.nav-link.link-gray-500.accordion-button.collapsed.py-2.hover-text-gray(
                href="#coffeeRoast" data-bs-toggle="collapse" role="button")
                | 咖啡焙度
              #coffeeRoast.collapse.vstack(data-bs-parent="#navAccordion")
                router-link.link-gray-500.text-decoration-none.ps-2.py-1.hover-text-gray(
                  to="/" v-for="(roast, key) in menu.roasts" :key="key")
                  | {{ roast }}
          hr.me-5.my-0.d-md-none
          .nav-item.mx-2
            router-link(to="/about").nav-link.link-gray-500.hover-text-gray
              | 關於我們
</template>

<style lang="scss" scoped>
.navbar-toggler:focus {
  box-shadow: none;
}
.sticky-top {
  position: sticky;
}
</style>

<script>
import UserTopbar from './User_Topbar.vue';

export default {
  data() {
    return {
      menu: {
        roasts: [
          '單火箭',
          '雙火箭',
          '三火箭',
          '原子烘焙',
        ],
      },
      products: {},
    };
  },
  props: {
    areas: {
      type: Array,
    },
  },
  components: {
    UserTopbar,
  },
  mounted() {
    // hide manu acccordion
    document.body.addEventListener('click', (event) => {
      if (event.target.id !== 'roast'
        && event.target.id !== 'area'
        && event.target.id !== 'navbarToggler') {
        document.querySelector('#coffeeArea').classList.remove('show');
        document.querySelector('#coffeeRoast').classList.remove('show');
        document.querySelector('#navbarContent').classList.remove('show');
      }
    });
  },
};
</script>
