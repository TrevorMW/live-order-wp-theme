import { defineStore } from 'pinia';
import axios from 'Axios';

export const scStore = defineStore('scStore', {
  state: () => {
    return {
      dataLoaded: false
    }
  },
  actions: {
    loadData: function(){
      const url = core.ajaxUrl;
      const data = new FormData();

      this.dataLoaded = false;

      data.append('action', core.endpoints.load_data.action);
      data.append('nonce',  core.endpoints.load_data.nonce);

      if(start){
        data.append('startDate', start);
      }

      if(end){
        data.append('endDate', end);
      }

      if(restaurant){
        data.append('restaurant', restaurant);
      }

      // data.append('startDate', '07/04/2024');
      // data.append('endDate', '07/07/2024');
      
      axios.post(url, data).then((resp) => {
        if(resp.status === 200 && resp.data){
          Object.assign(this, resp.data);
          this.dataLoaded = true;
        }
      })
    }
  }
});