<template lang="pug">
header.sticky-mobile

  //- UserTopbar
  nav.navbar.navbar-expand-md.navbar-light.bg-white
    .container.d-flex.flex-md-column.align-items-center

      router-link.navbar-brand.text-brand(:to="{ name: 'Home' }" title="宇宙咖啡")
        h1 Space Coffee #[span.visually-hidden 宇宙咖啡]

      button#navbarToggler.navbar-toggler.border-0.d-flex.ms-auto.d-md-none(
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#navbarOffcanvas"
      aria-controls="navbarOffcanvas"
      aria-expanded="false")
          small.fw-bold.my-auto.me-1.text-black.text-spacing-sm MENU
          span.navbar-toggler-icon

      UserNavbarCollapse(:products="products" :areas="areas")
      .d-md-none
        UserNavbarOffcanvas(:products="products" :areas="areas")
</template>

<script>
import UserNavbarCollapse from './UserNavbarCollapse.vue';
import UserNavbarOffcanvas from './UserNavbarOffcanvas.vue';

export default {
  components: {
    UserNavbarCollapse,
    UserNavbarOffcanvas,
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
};
</script>

<style lang="scss">
.navbar {
  z-index: 100;
  position: sticky;
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
</style>
