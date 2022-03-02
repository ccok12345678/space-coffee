<template lang="pug">
header.sticky-mobile

  //- UserTopbar
  nav.navbar.navbar-expand-md.navbar-light.bg-white
    .container.d-flex.flex-md-column.align-items-center

      router-link.navbar-brand.text-brand(:to="{ name: 'Home' }" title="宇宙咖啡")
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
            router-link(:to="{ name: 'Home' }" title="首頁").nav-link.link-gray-500.hover-text-gray
              | 首頁

          hr.me-5.my-0.d-md-none

          .d-flex.flex-column.flex-md-row

            .dropdown.border-0.mx-2

              a#area.nav-link.link-gray-500.dropdown-toggle.py-2.hover-text-gray(
                href="#coffeeArea"
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false")
                | 咖啡產區
              ul.dropdown-menu.border-3(aria-labelledby="area")
                li(v-for="(area, key) in areas" :key="key")
                  router-link.dropdown-item.link-gray-600.ps-2.py-1.hover-text-gray(
                    :to="`/shop/${area}`" )
                    | {{ area }}

            hr.me-5.my-0.d-md-none

            .dropdown.mx-2
              a#roast.nav-link.link-gray-500.dropdown-toggle.py-2.hover-text-gray(
                href="#coffeeRoast"
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false")
                | 咖啡焙度

              ul.dropdown-menu.border-3(aria-labelledby="roast")
                li(v-for="(roast, key) in menu.roasts" :key="key")
                  router-link.dropdown-item.link-gray-600.ps-2.py-1.hover-text-gray(
                    :to="`/shop/${roast}`")
                    | {{ roast }}

          hr.me-5.my-0.d-md-none

          .nav-item.mx-2
            router-link(to="/favorites").nav-button.nav-link.d-flex.link-gray-500.hover-text-gray
              | 收藏清單

          hr.me-5.my-0.d-md-none

          .nav-item.mx-2
            router-link.nav-button.nav-link.d-flex.link-gray-500.hover-text-gray(
              :to="{ name: 'UserOrders' }") 檢視訂單

          hr.me-5.my-0.d-md-none

          .nav-item.mx-2
            router-link(to="/blog").nav-link.link-gray-500.hover-text-gray
              | 部落格
</template>

<script>
export default {
  data() {
    return {
      menu: {
        roasts: [
          '單火箭烘焙',
          '雙火箭烘焙',
          '三火箭烘焙',
          '原子烘焙',
        ],
      },
      classifiedProducts: [],
    };
  },
  props: {
    areas: {
      type: Array,
      default() { return []; },
    },
    products: {
      type: Array,
      default() { return []; },
    },
  },
  methods: {
  },
  mounted() {
    // hide menu acccordion
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

<style lang="scss" scoped>
.navbar {
  z-index: 100;
}
.navbar-toggler:focus {
  box-shadow: none;
}
.nav-button::after {
  content: "";
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-left: auto;
  background-image: url("../../assets/images/telescope_icon.svg");
  background-repeat: no-repeat;
  background-size: 1.25rem;
}
.dropdown-toggle {
  display: flex;

  &::after {
    content: "";
    border: 0;
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    margin-left: auto;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 32 32' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 32 32'%3e%3ccircle cx='16' cy='16' r='10' fill='none' stroke='%23adb5bd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' class='stroke-000000'%3e%3c/circle%3e%3cpath d='M21.5 7.7c3.7-1.3 6.6-1.3 7.5.1 1.5 2.3-3 7.9-10.2 12.5s-14.1 6.3-15.6 4c-.9-1.4.3-3.8 2.8-6.5' fill='none' stroke='%23adb5bd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' class='stroke-000000'%3e%3c/path%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-size: 1.25rem;
    transition: transform 0.2s ease-in-out;
  }
  &:hover::after {
    transform: rotate(-180deg);
  }
}
.dropdown-menu {
  @media (max-width: 767.98px) {
    border: none;
  }
}
</style>
