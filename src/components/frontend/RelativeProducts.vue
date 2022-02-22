<template lang="pug">
section.mt-4.d-flex.flex-column
  h5.mx-auto 相關商品
  hr
  ul.list-group.flex-row.overflow-auto
    li.list-group-item.border-0(
      v-for="item in relativeProducts"
      :key="item.id")
      router-link(
        :to="`/product/${item.id}`" title="瞭解更多")
        .list-group-item-img
          img.img-fluid(:src="item.imageUrl"
            :title="item.title"
            :alt="item.title")
        .text-gray-600.text-center.mt-2
          | {{ item.title }}
          .text-gray-500
            | 特價：{{ item.price }}元/{{ item.unit }}

</template>

<script>
export default {
  data() {
    return {
      relativeProducts: [],
    };
  },
  props: {
    product: {
      type: Object,
      drfault() { return {}; },
    },
  },
  methods: {
    async getProducts() {
      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all
      `;
      let fetchData;

      try {
        const http = await fetch(api);
        fetchData = await http.json();
      } catch (error) {
        console.error(error);
      }

      return fetchData.products;
    },
    getCategory(products) {
      const categoryRex = new RegExp(this.product.category);

      return products
        .filter((product) => categoryRex.test(product.category));
    },
  },
  async created() {
    try {
      const products = await this.getProducts();
      this.relativeProducts = this.getCategory(products);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.list-group-item-img {
  width: 250px;
  height: 180px;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%)
                translateY(-50%);
  }
}
</style>
