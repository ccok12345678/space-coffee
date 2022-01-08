<template lang="pug">
#modal_order.modal.fade(tabindex="-1" ref="modal")
  .modal-dialog.modal-lg.modal-dialog-centered
    .modal-content.p-3()
      .modal-header.p-2.mb-3
      p {{ tempOrder }}
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      tempOrder: {},
    };
  },
  props: {
    order: {
      type: Object,
      default() { return {}; },
    },
  },
  mixins: [modalMixin],
  watch: {
    order() {
      this.tempOrder = this.order;
      console.log('order modal', this.tempOrder);
    },
  },
};
</script>
