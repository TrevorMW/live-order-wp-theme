import { defineStore } from 'pinia';
import axios from 'Axios';

import { noticeStore } from "../stores/notice.js";

export const merchantStore = defineStore('merchantStore', {
  state: () => {
    return {
      loaded: false,
      merchant: {
        oauth:{
          isConnected: false,
          link: null,
          expiration: null,
          scopes: []
        },
      },
      locations:[]
    }
  },
  actions: {
    loadMerchantData: async function (id) {
      this.loaded = false;

      const url = core.ajaxUrl;
      const data = new FormData();

      data.append('action', core.endpoints.load_merchant_data.action);
      data.append('nonce', core.endpoints.load_merchant_data.nonce);

      if (id) {
        data.append('id', id);
      }

      return await axios.post(url, data).then((resp) => {
        if (resp.status === 200 && resp.data.data) {
            this.merchant = resp.data.data.merchant;
            this.locations = resp.data.data.locations;
            this.loaded = true;
        }
        return resp;
      })
    },
    saveRestaurantSettings: async function(data){
      const ns = noticeStore();

      ns.hideNotice();

      return await axios.post(core.ajaxUrl, data).then((resp) => {
        ns.showNotice(resp.data.message, resp.data.success);
        return resp;
      });
    },
    updateEmployeeData: async function(data){
      const ns = noticeStore();

      ns.hideNotice();

      return await axios.post(core.ajaxUrl, data).then((resp) => {
        ns.showNotice(resp.data.message, resp.data.status);
        return resp;
      });
    },
    reauthorizeOauth: async function(data){
      const ns = noticeStore();

      ns.hideNotice();

      return await axios.post(core.ajaxUrl, data).then((resp) => {
        ns.showNotice(resp.data.message, resp.data.status);
        return resp;
      });
    },
    disconnectOauth: async function(data){
      const ns = noticeStore();

      ns.hideNotice();

      return await axios.post(core.ajaxUrl, data).then((resp) => {
        ns.showNotice(resp.data.message, resp.data.status);
        return resp;
      });
    },
    deleteMerchant: async function(data){
      const ns = noticeStore();

      ns.hideNotice();

      return await axios.post(core.ajaxUrl, data).then((resp) => {
        ns.showNotice(resp.data.message);
        return resp;
      });
    }
  }
});