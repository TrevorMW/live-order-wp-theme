import { defineStore } from 'pinia';

export const modalStore = defineStore('modalStore', {
  state: () => {
    return {
      visible: false,
      content: {
        header: '',
        body: '',
        footer: ''
      },
      status: false
    }
  },
  actions: {
    showModal: function (msg, status) {
      this.visible = true;
      this.msg = msg;
      this.status = status;
    },
    hideModal: function () {
      this.visible = false;
    }
  }
});