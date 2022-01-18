<template lang="pug">
.container-lg.my-4
  .row.justify-content-center
    form.col-md-10(@submit.prevent="sendOrder")
      .row.justify-content-center
        .col-12.text-center
          h5.mb-3 訂購人資料
        .col-4.d-flex
          label.my-auto.ms-auto(for="userName") *姓名：
        .col-8
          input#userName.form-control.my-2.w-85(type="text" name="userName"
          placeholder="Name")
        .col-4.d-flex
          label.my-auto.ms-auto(for="userPhone") *聯絡電話：
        .col-8
          input#userPhone.form-control.my-2.w-85(type="tel" name="userPhone"
          placeholder="Phone number")
        .col-4.d-flex
          label.my-auto.ms-auto(for="userEmail") *E-Mail：
        .col-8
          input#userEmail.form-control.my-2.w-85(type="email" name="userEmail"
          placeholder="example@mail.com")
        .col-4.d-flex
          label.my-auto.ms-auto(for="userAddress") *收件地址：
        .col-8
          input#userAddress.form-control.my-2.w-85(type="text" name="userAddress"
          placeholder="Address")
        .col-4
        .col-8.m-auto
          .form-floating.my-2.w-85
            textarea#userMessage.form-control.textarea(name="userMessage")
            label(for="userMessage") 附加說明（非必填）：
        .devider.w-75.my-3.border-secondary
        .col-7.text-end
          | 訂單金額：
        .col-5.text-center.fw-bold
          | NT$ {{ $filters.currency(carts.final_total) }}
        .devider.w-75.my-3
        .col-10
          .text-center.text-md-end
            button.btn.btn-cyan-600.text-light(type="submit")
              | 建立訂單
              i.bi.bi-box-arrow-right.ms-2

</template>

<style lang="scss" scoped>
.textarea {
  height: 75px;
}
</style>

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
    async sendOrder() {
      console.log('send order!');
    },
  },
  async created() {
    this.carts = await this.getCart();
    console.log('carts', this.carts);
  },
};
</script>
