import { defineStore } from 'pinia';
import axios from 'Axios';

export const loaderStore = defineStore('loaderStore', {
    state: () => {
        return {
            isActive: false,
        }
    },
    actions: {
        showLoader: function () {
            this.isActive = true;
        },
        hideLoader: function () {
            this.isActive = false;
        }
    }
});