import { filter } from 'lodash';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

import axios from 'Axios';

import { noticeStore } from "../stores/notice.js";

export const orderStore = defineStore('orderStore', {
    state: () => {
        return {
            loaded: false,
            orders: {
                proposed: [],
                reserved: [],
                prepared: [],
            },
            disallowAccess: false,
            filters: {},
        }
    },
    actions: {
        loadOrdersData: async function (userID, systemID, locationID) {
            this.loaded = false;

            const url = core.ajaxUrl;
            const data = new FormData();

            data.append('action', core.endpoints.load_orders_data.action);
            data.append('nonce', core.endpoints.load_orders_data.nonce);

            if (userID) {
                data.append('userID', userID);
            }

            if (systemID) {
                data.append('merchantID', systemID);
            }

            if (locationID) {
                data.append('locationID', locationID);
            }

            return await axios.post(url, data).then((resp) => {
                this.loaded = true;
                if (resp.status === 200 && resp.data) {

                    // if we have tampering here, we should set certain things
                    if (!resp.data.status && resp.data?.data?.disallowAccess) {
                        this.loaded = false;
                        Object.assign(this.disallowAccess, resp.data.data.disallowAccess);
                    }

                    Object.assign(this, resp.data.data);
                }
            });
        },
        loadOrderData: async function (userID, merchantID, locationID, orderID) {
            const url = core.ajaxUrl;
            const data = new FormData();

            data.append('action', core.endpoints.load_order_data.action);
            data.append('nonce', core.endpoints.load_order_data.nonce);

            if (userID) {
                data.append('userID', userID);
            }

            if (merchantID) {
                data.append('merchantID', merchantID);
            }

            if (locationID) {
                data.append('locationID', locationID);
            }

            if (orderID) {
                data.append('orderID', orderID);
            }

            return axios.post(url, data);
        },
        updateOrderData: async function (userID, merchantID, locationID, orderID, webhook) {
            return this.loadOrderData(userID, merchantID, locationID, orderID);
        },
        findCurrentOrderInst(id) {
            let orderRef = null;
            const allOrders = this.orders;

            for (const placement in allOrders) {
                let idx = null;
                let foundOrder;
                const orders = allOrders[placement];

                if (orders) {
                    idx = orders.findIndex((order) => order.id === id);  
                }

                if(idx >= 0){
                    foundOrder = orders[idx];

                    if(foundOrder){
                        orderRef = {
                            placement: placement,
                            inst: foundOrder,
                            idx: idx
                        }
                    }
                }
            }

            return orderRef;
        },
        removeOrder(type, inst) {
            const columnName = type.toLowerCase();

            setTimeout(() => {
                if (type && inst && columnName in this.orders) {
                    this.orders[columnName] = this.orders[columnName].filter(el => {
                        return el.id != inst.id;
                    })
                }
            }, 1500)
        },
        categorizeOrder(order, type) {
            if(order && type){
                const columnName = type.toLowerCase();
                if (type && order && columnName in this.orders) {
                    this.orders[columnName].push(order)
                }
            }
        }
    }
});