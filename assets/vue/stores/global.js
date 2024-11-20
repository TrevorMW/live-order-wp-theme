import { defineStore } from 'pinia';
import axios from 'Axios';

import { noticeStore } from "../stores/notice";

export const globalStore = defineStore('globalStore', {
  state: () => {
    return {
      loaded: false,
      data: null
    }
  },
  actions: {
    loadGlobalData: async function () {
      const url = core.ajaxUrl;
      const data = new FormData();

      data.append('action', core.endpoints.load_global_data.action);
      data.append('nonce', core.endpoints.load_global_data.nonce);

      const resp = await axios.post(url, data).then((resp) => {
        if (resp.status === 200 && resp.data) {
          Object.assign(this, resp.data);
          this.loaded = true;
        }

        return resp;
      });

      return resp;
    },
    setCurrentRestaurant: async function (id, user_id) {
      const url = core.ajaxUrl;
      const data = new FormData();

      data.append('action', this.endpoints.set_current_restaurant.action);
      data.append('nonce', this.endpoints.set_current_restaurant.nonce);
      data.append('user_id', user_id);
      data.append('restaurant_id', id);

      const resp = await axios.post(url, data);

      return resp;
    },
    unsetCurrentRestaurant: async function (id) {
      const url = core.ajaxUrl;
      const data = new FormData();
    
      data.append('action', this.endpoints.unset_current_restaurant.action);
      data.append('nonce', this.endpoints.unset_current_restaurant.nonce);
      data.append('user_id', id);

      const resp = await axios.post(url, data);

      return resp;
    },
    logUserIn: async function(data){
      const ns = noticeStore();

      ns.hideNotice();

      return await axios.post(core.ajaxUrl, data).then((resp) => {
        if (resp.status === 200) {
          ns.showNotice(resp.data.message, true);

          if (!resp.data.status) {
            ns.showNotice(resp.data.message, false);
          }
        } else {
          ns.showNotice(resp.data.message, false);
        }

        return resp;
      });
    },
    logUserOut: async function (data) {
      const url = core.ajaxUrl;

      return await axios.post(url, data).then((resp) => {
          window.location.reload();
      });
  },
    resetUserPassword: async function(data){
      const ns = noticeStore();

      ns.hideNotice();

      return await axios.post(core.ajaxUrl, data).then((resp) => {
        if (resp.status === 200) {
          ns.showNotice(resp.data.message, true);

          if (!resp.data.status) {
            ns.showNotice(resp.data.message, false);
          }
        } else {
          ns.showNotice(resp.data.message, false);
        }

        return resp;
      });
    },
    registerUser: async function(data){
      const ns = noticeStore();

      ns.hideNotice();

      return await axios.post(core.ajaxUrl, data).then((resp) => {
        if (resp.status === 200) {
          ns.showNotice(resp.data.message, true);

          if (!resp.data.status) {
            ns.showNotice(resp.data.message, false);
          }
        } else {
          ns.showNotice(resp.data.message, false);
        }

        return resp;
      });
    },
    confirmUserAction: async function(msg){
      return new Promise(function(resolve){
        if(confirm(msg)){
          resolve(1);
        } else {
          resolve(0);
        }
      });
    },
    toggleLoginForm: function () {
      this.showRegisterForm = false;
      this.showPasswordForm = false;
      this.showLoginForm = true;
    },
    toggleRegisterForm: function () {
      this.showPasswordForm = false;
      this.showLoginForm = false;
      this.showRegisterForm = true;
    },
    togglePasswordForm: function () {
      this.showRegisterForm = false;
      this.showLoginForm = false;
      this.showPasswordForm = true;
    },
  }
});
