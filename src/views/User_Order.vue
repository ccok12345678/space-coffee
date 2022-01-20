<template lang="pug">
.container-lg.my-4
  .row.justify-content-center
    Form.col-md-10.d-flex.flex-column(@submit="submitOrder"
      v-slot="{ errors }")
      ProgressBar(:step="$route.name")
      .row.justify-content-center
        .col-12.text-center
          h5.mb-3 訂購人資料
        .col-4.d-flex.flex-column
          label.my-auto.ms-auto(for="name") *姓名：
          ErrorMessage.fs-12.ms-auto.text-danger(name="姓名")
        .col-8
          Field#name.form-control.my-2.w-85.shadow-none(type="text" name="姓名"
          placeholder="Name"
          v-model.trim="user.name"
          rules="required"
          :class="{ 'is-invalid': errors['姓名'], 'is-valid:': !errors['姓名'] }")
        .col-4.d-flex.flex-column
          label.my-auto.ms-auto(for="tel") *聯絡電話：
          ErrorMessage.text-danger.ms-auto.fs-12(name="tel")
        .col-8
          Field#tel.form-control.my-2.w-85.shadow-none(type="tel" name="tel"
          placeholder="Phone number"
          v-model.trim="user.tel"
          :rules="isPhone" rules="reauired"
          :class="{ 'is-invalid': errors['tel'] }")
        .col-4.d-flex.flex-column
          label.my-auto.ms-auto(for="email") *E-Mail：
          ErrorMessage.fs-12.ms-auto.text-danger(name="email")
        .col-8
          Field#email.form-control.my-2.w-85.shadow-none(type="email" name="email"
          placeholder="example@mail.com"
          v-model.trim="user.email"
          rules="email|required"
          :class="{ 'is-invalid': errors['email'] }")
        .col-4.d-flex.flex-column
          label.my-auto.ms-auto(for="address") *收件地址：
          ErrorMessage.fs-12.ms-auto.text-danger(name="地址")
        .col-8
          Field#address.form-control.my-2.w-85.shadow-none(type="text" name="地址"
          placeholder="Address"
          v-model.trim="user.address"
          rules="required"
          :class="{ 'is-invalid': errors['地址'] }")
        .col-4
        .col-8.m-auto
          .form-floating.my-2.w-85
            textarea#userMessage.form-control.textarea(name="userMessage"
            v-model="message")
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
import ProgressBar from '@/components/User_ProgressBar.vue';

export default {
  data() {
    return {
      carts: {},
      user: {
        name: 'Karl',
        email: 'ccok@mail.com',
        tel: '0911111111',
        address: '六角鄉',
      },
      message: '',
    };
  },
  components: {
    ProgressBar,
  },
  inject: ['pushToast', 'scrollTop'],
  methods: {
    async getCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const http = await fetch(api);
      const data = await http.json();

      return data.data;
    },
    async submitOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const order = {
        data: {
          user: { ...this.user },
          message: this.message,
        },
      };
      console.log(order);
      const http = await fetch(api, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      const data = await http.json();

      console.log('order', data);
      this.pushToast(data, '訂單');
      this.$router.push({ name: 'Check', params: { orderId: data.orderId } });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;

      if (!value) {
        return '電話為必填';
      }
      return phoneNumber.test(value) ? true : '號碼不正確';
    },
  },
  async created() {
    document.title = '訂購人資料｜宇宙咖啡';
    this.scrollTop();
    this.carts = await this.getCart();
  },
};
</script>
