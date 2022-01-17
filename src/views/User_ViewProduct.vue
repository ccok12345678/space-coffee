<template lang="pug">
.container-lg.my-5.text-gray-600
  .row.justify-content-center
    main.col-lg-7.d-flex.justify-content-center.order-2.order-lg-1
      .card.border-0.rounded-0
        .card-img
          img.card-img-top.rounded-0(:src="tempProduct.imageUrl" :alt="tempProduct.content"
          :title="tempProduct.title")
        h3.card-title.mx-auto.mt-4.d-block.d-lg-none {{ tempProduct.title }}
        .mx-auto.text-center.d-block.d-lg-none.my-3
          .text-gray-300.text-decoration-line-through
            | 原價：{{ $filters.currency(tempProduct.origin_price) }}元 / {{ tempProduct.unit }}
          .text-cyan-600.fs-5
            | 特價：{{ $filters.currency(tempProduct.price) }}元 / {{ tempProduct.unit }}
          .input-group.input-group-sm.w-50.mt-2.mx-auto
            span.input-group-text.text-gray-600.bg-white.border-0 數量：
            input.form-control.rounded(type="number" min="1" step="1" name="qty"
            v-model="qty")
          button.btn.btn-cyan-600.text-light.w-75.my-2(type="button"
            @click.prevent.stop="addCart(tempProduct.id)"
            :disabled="status === tempProduct.id")
            .spinner-border.spinner-border-sm.mx-4(v-if="status === tempProduct.id")
              .visually-hidden Loading...
            span(v-else) 加入購物車
          button.btn.btn-outline-gray-600.w-75 加入收藏
        .card-body.px-3.px-md-5
          .d-block.d-lg-none.d-flex.flex-column
            .devider.w-50.mx-auto.mb-4.border-gray-500
            p.mb-2.mx-auto 風味描述
            p.mb-0 {{ tempProduct.description }}
          .pt-5
            p.card-text.fw-light.lh-lg.pt-4
              strong.mx-auto 產地：{{ tempProduct.category }}#[br]
              | {{ tempProduct.content }}
            .devider.w-50.mx-auto.my-4.border-gray-500
            .d-flex.justify-content-around.mt-2.d-block.d-lg-none
              img.mx-auto(src="../assets/images/aeropress_coffee.svg" width="50"
                title="good for aeropress" alt="aeropress")
              img.mx-auto(src="../assets/images/french_press.svg" width="50"
                title="good for french press" alt="french press")
              img.mx-auto(src="../assets/images/portafilter_tamper_icon.svg" width="50"
                title="good for espresso" alt="espresso")
    .col-lg-4.order-1.order-lg-2.d-none.d-lg-block
      aside.d-flex.flex-column
        h5.mx-auto {{ tempProduct.title }}
        .devider.w-25.mx-auto.my-4.border-gray-500
        .d-flex.justify-content-around.mt-2
          img.mx-auto(src="../assets/images/aeropress_coffee.svg" width="50"
            title="good for aeropress" alt="aeropress")
          img.mx-auto(src="../assets/images/french_press.svg" width="50"
            title="good for french press" alt="french press")
          img.mx-auto(src="../assets/images/portafilter_tamper_icon.svg" width="50"
            title="good for espresso" alt="espresso")
        .devider.w-25.mx-auto.my-4.border-gray-500
        .mx-auto.d-flex.flex-column.align-items-center
          .text-gray-300.text-decoration-line-through
            | 原價：{{ $filters.currency(tempProduct.origin_price) }}元 / {{ tempProduct.unit }}
          .text-cyan-600.fs-5
            | 特價：{{ $filters.currency(tempProduct.price) }}元 / {{ tempProduct.unit }}
          .input-group.input-group-sm.w-50.mt-2
            span.input-group-text.text-gray-600.bg-white.border-0 數量：
            input.form-control.rounded(type="number" min="1" step="1" name="qty"
            v-model="qty")
          button.btn.btn-cyan-600.text-light.w-75.my-2(type="button"
            @click.prevent.stop="addCart(tempProduct.id)"
            :disabled="status === tempProduct.id")
            .spinner-border.spinner-border-sm.mx-4(v-if="status === tempProduct.id")
              .visually-hidden Loading...
            span(v-else) 加入購物車
          button.btn.btn-outline-gray-600.w-75 加入收藏
        .devider.w-25.mx-auto.my-4.border-gray-500
        p.mb-1.mx-auto 風味描述
        p.mb-0.w-75.mx-auto {{ tempProduct.description }}

</template>

<style lang="scss" scoped>
.card {
  max-width: 500px;
}

.card-text {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: -28px;
    padding-top: 40px;
    background: url('../assets/images/barista_coffee.svg') no-repeat center;
  }
}

.card-img {
  overflow: hidden;
  width: 100%;
  height: 400px;
  position: relative;

  @media (max-width: 576px) {
    height: 300px;
  }

  &-top {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}

</style>

<script>
export default {
  data() {
    return {
      tempProduct: {},
      qty: 1,
      status: '',
    };
  },
  inject: ['pushToast', 'emitter'],
  methods: {
    async getProduct() {
      const { id } = this.$route.params;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      const http = await fetch(api);
      const data = await http.json();
      this.tempProduct = await data.product;
      // console.log(this.tempProduct);
      document.title = `${this.tempProduct.title}`;
    },
    async addCart(id) {
      this.status = id;

      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const product = { data: { product_id: id, qty: this.qty } };
      const http = await fetch(api, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const data = await http.json();

      this.pushToast(data, this.tempProduct.title);
      this.emitter.emit('add-cart', this.qty);
      this.qty = 1;
      this.status = '';
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
