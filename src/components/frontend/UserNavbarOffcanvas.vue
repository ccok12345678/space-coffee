<template lang="pug">
aside#navbarOffcanvas.offcanvas.offcanvas-start.text-center(
  ref="navbarOffcanvas")
  .offcanvas-header.pb-1
    router-link.mx-auto.link-dark.fs-1.text-brand(
      :to="{ name: 'Home' }" title="首頁")
      | Space Coffee

  .offcanvas-body
    .nav-item.mx-2(data-bs-dismiss="offcanvas")
      router-link.nav-link.link-gray-600.hover-text-gray(
        :to="{ name: 'Home' }"
        title="首頁")
        | 首頁

    .devider.w-75.border-2.mx-auto.border-gray-300

    #navAccordion.accordion

      .accordion-item.border-0

        a#area.link-gray-600.accordion-button.py-2.hover-text-gray(
          href="#"
          role="button"
          @click.prevent="toggleDropdown('bsArea')")
          .ms-auto 咖啡產區

        #coffeeArea.collapse.vstack(
          data-bs-parent="#navAccordion"
          ref="coffeeArea"
          data-bs-dismiss="offcanvas")
          router-link.link-secondary.text-decoration-none.py-2.hover-text-gray(
            v-for="(area, key) in areas"
            :to="`/shop/${area}`"
            :key="key")
            | ⪘ {{ area }}

      .devider.w-75.border-2.mx-auto.border-gray-300

      .accordion-item
        a#roast.nav-link.link-gray-600.accordion-button.py-2.hover-text-gray(
          href="#"
          role="button"
          @click.prevent="toggleDropdown('bsRoast')")
          .ms-auto 咖啡焙度

        #coffeeRoast.collapse.vstack(
          data-bs-parent="#navAccordion"
          ref="coffeeRoast"
          data-bs-dismiss="offcanvas")
          router-link.link-secondary.text-decoration-none.py-2.hover-text-gray(
            :to="`/shop/${roast}`"
            v-for="(roast, key) in menu.roasts"
            :key="key")
            | ⪢ {{ roast }}

    .devider.w-75.border-2.mx-auto.border-gray-300

    .nav-item.mx-2(data-bs-dismiss="offcanvas")
      router-link(to="/favorites").nav-button.nav-link.d-flex.link-gray-600.hover-text-gray
        .ms-auto 收藏清單

    .devider.w-75.border-2.mx-auto.border-gray-300

    .nav-item.mx-2(data-bs-dismiss="offcanvas")
      router-link.nav-button.nav-link.d-flex.link-gray-600.hover-text-gray(
        :to="{ name: 'UserOrders' }")
        .ms-auto 檢視訂單

    .devider.w-75.border-2.mx-auto.border-gray-300

    .nav-item.mx-2(data-bs-dismiss="offcanvas")
      router-link.nav-link.nav-button.d-flex.link-gray-600.hover-text-gray(to="/blog")
        .ms-auto 部落格

    .devider.w-75.border-2.mx-auto.border-gray-300

    .nav-item.mx-2.mt-4
      button.btn.text-secondary.w-100(type="button" data-bs-dismiss="offcanvas")
        | 關閉選單
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  data() {
    return {
      menu: {
        roasts: ['單火箭烘焙', '雙火箭烘焙', '三火箭烘焙', '原子烘焙'],
      },
      classifiedProducts: [],
      bsArea: null,
      bsRoast: null,
    };
  },
  props: {
    areas: {
      type: Array,
      default() {
        return [];
      },
    },
    products: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    toggleDropdown(bs) {
      this[bs].toggle();
    },
  },
  mounted() {
    // hide dropdown menu
    this.bsArea = new Collapse(this.$refs.coffeeArea);
    this.bsRoast = new Collapse(this.$refs.coffeeRoast);

    document.body.addEventListener('click', (evt) => {
      const targetId = evt.target.id;
      if (targetId !== 'area' && targetId !== 'roast') {
        this.bsArea.hide();
        this.bsRoast.hide();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.accordion-button {
  box-shadow: none;

  &::after {
    margin-left: 2px;
    margin-right: auto;
  }
}
.nav-button {
  &::after {
    margin-right: auto;
    margin-left: 2px;
  }
}
</style>
