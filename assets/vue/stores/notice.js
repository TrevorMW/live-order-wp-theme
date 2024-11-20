import { defineStore } from 'pinia';
import axios from 'Axios';

export const noticeStore = defineStore('noticeStore', {
  state: () => {
    return {
      visible: false,
      msg: '',
      status: false
    }
  },
  actions: {
    showNotice: function (msg, status) {
      this.visible = true;
      this.msg = msg;
      this.status = status;

      setTimeout(() => {
        this.hideNotice();
      }, 4000);
    },
    hideNotice: function () {
      this.visible = false;
    }
  }
});