<template lang="pug">
.bg-gray-100

  .row.gx-0

    .col-md-3
      SideBar

    #table-container.col-md-9.p-1.p-sm-2.p-md-4.vh-100.overflow-auto
      router-view

      .bg-dashboard(v-if="$route.name === 'Dashboard'")
ToastMessages
</template>

<script>
import SideBar from '@/components/backend/SideBar.vue';
import ToastMessages from '@/components/ToastMessages.vue';
import tokenValue from '@/methods/tokenValue';
import emitter from '@/methods/emitter';
import pushToast from '@/methods/pushToast';

export default {
  components: {
    SideBar,
    ToastMessages,
  },
  provide() {
    return {
      tokenValue,
      pushToast,
      emitter,
    };
  },
  methods: {
    async loginCheck() {
      const api = `${process.env.VUE_APP_API}/api/user/check`;
      const http = await fetch(api, {
        method: 'post',
        headers: { Authorization: tokenValue },
      });

      try {
        const data = await http.json();

        pushToast(data, '已登入');

        if (!data.success) {
          this.$router.push('/login');
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.loginCheck();
  },
};
</script>

<style lang="scss" scoped>
.bg-dashboard {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/ufo-catch-cow.svg');
  background-repeat: no-repeat;
  background-size:contain;
  background-position: center center;
}
</style>
