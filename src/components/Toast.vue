<template lang="pug">
.toast(role='alert' aria-live='assertive' aria-atomic='true' ref='toast')
  .toast-header(:class="`bg-${message.style}`")
    strong.me-auto {{ message.title }} hhhhh
    button.btn-close(type='button' data-bs-dismiss='toast' aria-label='Close')
  .toast-body(v-if="message.message")
    | {{ message.message }}
</template>

<style lang="scss">
.toast {
  z-index: 10;
}
</style>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  props: {
    message: {
      type: Object,
    },
  },
  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, {
      delay: 3000,
    });
    toast.show();
    console.log('in toast');
  },
};
</script>
