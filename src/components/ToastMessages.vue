<template lang="pug">
.toast-container.position-fixed.pe-3.pb-3.mb-4.bottom-0.end-0
  Toast(v-for="(msg, key) in messages" :key="key"
    :message="msg")
</template>

<script>
import emitter from '@/methods/emitter';
import Toast from './Toast.vue';

export default {
  data() {
    return {
      messages: [],
    };
  },
  components: {
    Toast,
  },
  mounted() {
    emitter.on('push-toast', (msg) => {
      const { style = 'success', title, message } = msg;
      this.messages.push({ style, title, message });
    });
  },
};
</script>
