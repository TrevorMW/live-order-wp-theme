<template>
  <Panel :class="[{ 'panel': true }]">
    <template #header>
      <div class="panel-icon">
        <div>
          <img v-if="type" style="width:16px; " :src="getMerchantType(type)" alt="POS" :title="type" />
        </div>
        <div>{{ name }}</div>
      </div>
    </template>
    <template #action>
      <div class="posPanelActions">
        <div>
          <a @click.prevent="copyLocationDashboardURL()">
            <span class="material-symbols-outlined">content_copy</span>
          </a>
        </div>
        <div>
          <a href="" @click.prevent="deleteRestaurant(id)">
            <span class="material-symbols-outlined">delete</span>
          </a>
        </div>
      </div>
    </template>
    <template #content>
      <p>External URL: {{ getDashboardURL }}</p>
    </template>
  </Panel>
</template>

<script>
import { mapState } from "pinia";
import { globalStore } from "../stores/global.js";
import { merchantStore } from "../stores/merchant.js";
import { noticeStore } from "../stores/notice.js";

import Panel from "../components/Panel.vue";

export default {
  name: "Location",
  components: {
    Panel
  },
  props: {
    id:{
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    type:{
      type: Object,
      required: true
    },
    isSetup:{
      type: Boolean,
      required: true
    },
    merchantID:{
      type: String,
      required: true
    },
    merchantPostID:{
      type: String,
      required: true
    },
    locationID:{
      type: String,
      required: true
    },
    locationPostID:{
      type: String,
      required: true
    },
    
    timezone:{
      type: String,
      required: true
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(globalStore, {
      user_id: (store) => store.user.id,
      imageURL: store => store.imageURL,
      baseURL: store => store.baseURL
    }),
    getDashboardURL(){
      return `${ this.baseURL }/dashboard/${ this.user_id }/${ this.merchantID }/${ this.merchantPostID }/${ this.locationID }/${ this.locationPostID }/`;
    }
  },
  methods: {
    getMerchantType(pos) {
      let img = "";

      if ((pos && pos["value"] === "Square") || pos["value"] === "square") {
        img = this.imageURL + "Square_Jewel_Black.svg";
      }

      if ((pos && pos["value"] === "Toast") || pos["value"] === "toast") {
        img = this.imageURL + "toast-slice-icon_white.png";
      }

      if ((pos && pos["value"] === "Clover") || pos["value"] === "clover") {
        img = this.imageURL + "clover_logo_rgb.png";
      }

      return img;
    },
    deleteRestaurant(){

    },
    setActiveRestaurant: function (id, user_id) {
      const gs = globalStore();
      const ns = noticeStore();
      

      gs.setCurrentRestaurant(id, user_id).then((resp) => {
        if(resp.status === 200){
          ns.showNotice(resp.data.message, resp.data.status);
          gs.loadGlobalData().then(() => {
            this.handleRestaurantRedirect();
          });
        }
      });
    },
    handleRestaurantRedirect: function () {
      this.$router.push("/dashboard");
    },
    copyLocationDashboardURL(){
      
    }
  },
  
};
</script>

<style lang="scss" scoped></style>