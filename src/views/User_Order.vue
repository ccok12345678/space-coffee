<template lang="pug">
.container-lg.my-4
  .row.justify-content-center
    form.col-md-10
      .row.justify-content-center
        .col-7.text-end
          | 訂單金額：
        .col-5.text-center.fw-bold
          | NT$ {{ $filters.currency(carts.final_total) }}
        .devider.w-75.mb-3
        .col-4.d-flex
          label.m-auto(for="userName") 姓名：
        .col-8
          input#userName.form-control.my-2.w-75(type="text" name="userName"
          placeholder="輸入姓名")
        .col-4.d-flex
          label.m-auto(for="userPhone") 聯絡電話：
        .col-8
          input#userPhone.form-control.my-2.w-75(type="tel" name="userPhone"
          placeholder="輸入電話")
        .col-4.d-flex
          label.m-auto(for="userEmail") E-Mail：
        .col-8
          input#userEmail.form-control.my-2.w-75(type="email" name="userEmail"
          placeholder="example@mail.com")
        .col-4.d-flex
          label.m-auto(for="userAddress") 收件地址：
        .col-8
          input#userAddress.form-control.my-2.w-80(type="text" name="userAddress"
          placeholder="輸入地址")

</template>

<script>
export default {
  data() {
    return {
      carts: {},
    };
  },
  methods: {
    async getCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const http = await fetch(api);
      const data = await http.json();

      return data.data;
    },
  },
  async created() {
    this.carts = await this.getCart();
    console.log('carts', this.carts);
  },
};
</script>
