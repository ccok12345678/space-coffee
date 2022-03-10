<template lang="pug">
.container-lg.my-4

  .row.justify-content-center

    Form.col-md-10.d-flex.flex-column(@submit="submitOrder"
      v-slot="{ errors }")

      ProgressBar(:step="$route.name")

      .row.justify-content-center

        .col-12.text-center
          h5.mb-3 訂購人資料

        .col-4.col-md-3.d-flex.flex-column.mt-2
          label.ms-auto.my-auto(for="name") *姓名：
        .col-8.mt-2
          Field#name.form-control.w-85.shadow-none(type="text" name="姓名"
          placeholder="Name"
          v-model.trim="user.name"
          rules="required"
          :class="{ 'is-invalid': errors['姓名'] }")
        .col-8.offset-4.offset-md-3
          ErrorMessage.fs-12.ms-auto.text-danger(name="姓名")

        .col-4.col-md-3.d-flex.flex-column(
          :class="{ 'mt-4': !errors['姓名'], 'mt-2': errors['姓名'] }")
          label.ms-auto.my-auto(for="tel") *聯絡電話：
        .col-8(:class="{ 'mt-4': !errors['姓名'], 'mt-2': errors['姓名'] }")
          Field#tel.form-control.w-85.shadow-none(type="tel" name="tel"
          placeholder="Phone number"
          v-model.trim="user.tel"
          :rules="isPhone" rules="reauired"
          :class="{ 'is-invalid': errors['tel'] }")
        .col-8.offset-4.offset-md-3
          ErrorMessage.text-danger.ms-auto.fs-12(name="tel")

        .col-4.col-md-3.d-flex.flex-column(
          :class="{'mt-4': !errors['tel'],'mt-2': errors['tel']}")
          label.my-auto.ms-auto(for="email") *E-Mail：
        .col-8(:class="{'mt-4': !errors['tel'],'mt-2': errors['tel']}")
          Field#email.form-control.w-85.shadow-none(type="email" name="email"
          placeholder="example@mail.com"
          v-model.trim="user.email"
          rules="email|required"
          :class="{'is-invalid': errors['email']}")
        .col-8.offset-4.offset-md-3
          ErrorMessage.fs-12.ms-auto.text-danger(name="email")

        .col-4.col-md-3.d-flex.flex-column(
          :class="{'mt-4': !errors['email'],'mt-2': errors['email']}")
          label.my-auto.ms-auto(for="address") *收件地址：
        .col-8(:class="{'mt-4': !errors['email'],'mt-2': errors['email']}")
          Field#address.form-control.w-85.shadow-none(type="text" name="地址"
          placeholder="Address"
          v-model.trim="user.address"
          rules="required"
          :class="{ 'is-invalid': errors['地址'] }")
        .col-8.offset-4.offset-md-3
          ErrorMessage.fs-12.ms-auto.text-danger(name="地址")

        .col-8.offset-4.offset-md-3(:class="{'mt-4': !errors['地址'],'mt-2': errors['地址']}")
          .form-floating.mb-2.w-85
            textarea#userMessage.form-control.textarea(name="userMessage"
            v-model="message")
            label(for="userMessage") 附加說明（非必填）：

        .divider.w-75.my-3.border-secondary

        .col-7.text-end
          | 訂單金額：
        .col-5.text-center.fw-bold
          | NT$ {{ $filters.currency(carts.final_total) }}

        .divider.w-75.my-3

        .col-10

          .text-center.text-md-end
            button.btn.btn-cyan-600.text-light(type="submit")
              | 建立訂單
              i.bi.bi-box-arrow-right.ms-2

</template>

<script>
import ProgressBar from '@/components/frontend/UserProgressBar.vue';

export default {
  metaInfo: {
    title: '訂購人資料',
  },
  data() {
    return {
      carts: {},
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
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
      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart
      `;
      let fetchData;

      try {
        const http = await fetch(api);
        fetchData = await http.json();
      } catch (error) {
        console.error(error);
      }
      return fetchData.data;
    },

    async submitOrder() {
      const api = `
        ${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order
      `;
      const order = {
        data: {
          user: { ...this.user },
          message: this.message,
        },
      };
      try {
        const http = await fetch(api, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        });
        const fetchData = await http.json();

        this.pushToast(fetchData, '訂單');
        this.$router.push({ name: 'Check', params: { orderId: fetchData.orderId } });
      } catch (error) {
        console.error(error);
      }
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
    this.scrollTop();

    try {
      this.carts = await this.getCart();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.textarea {
  height: 75px;
}
</style>
