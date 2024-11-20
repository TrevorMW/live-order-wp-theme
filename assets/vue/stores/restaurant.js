import { defineStore } from 'pinia';
import axios from 'Axios';

import { noticeStore } from "../stores/notice.js";

export const restaurantStore = defineStore('restaurantStore', {
  state: () => {
    return {
      loaded: false,
      restaurant: {
        oauth:{
          isConnected: false,
          link: null,
          expiration: null,
          scopes: []
        },
        jobTypes: null
      }
    }
  },
  actions: {
    loadRestaurantData: async function (id) {
      this.loaded = false;

      const url = core.ajaxUrl;
      const data = new FormData();

      data.append('action', core.endpoints.load_restaurant_data.action);
      data.append('nonce', core.endpoints.load_restaurant_data.nonce);

      if (id) {
        data.append('id', id);
      }

      return await axios.post(url, data).then((resp) => {
        if (resp.status === 200 && resp.data) {
          this.restaurant = resp.data.restaurant;
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
    deleteRestaurant: async function(data){
      const ns = noticeStore();

      ns.hideNotice();

      return await axios.post(core.ajaxUrl, data).then((resp) => {
        ns.showNotice(resp.data.message);
        return resp;
      });
    }
  }
});