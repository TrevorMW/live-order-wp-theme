<template>
  <Panel :class="[{ 'panelConnectedPOS': true }]">
    <template #header>
      <div class="panelConnectedPOSHeader">
        <div>
          <img v-if="type" :src="getMerchantType({ value: type })" alt="POS" :title="type" />
        </div>
        <div>{{ name }}</div>
      </div>
    </template>
    <template #action>
      <div class="posPanelActions">
        <div>
          <a href="" @click.prevent="this.$router.push({ name: 'Merchant', params: { id: id } })">
            <span class="material-symbols-outlined">edit</span>
          </a>
        </div>
        <div>
          <a href="" @click.prevent="deletePOS(id)">
            <span class="material-symbols-outlined">delete</span>
          </a>
        </div>
        <div>
          <span :class="[
            {
              'material-symbols-outlined': true,
              'wifi': true,
              'connected': connected,
              'disconnected': !connected,
            },
          ]">{{ connected ? "wifi" : "wifi_off" }}</span>
        </div>
      </div>
    </template>
    <template #content>
      <p>{{ merchantID }}</p>
      <p v-if="connected">
        Connection Expires: {{ expires }}
      </p>
      <p v-else>No API Connection</p>
    </template>
  </Panel>
</template>

<script>
import { mapState } from "pinia";
import { globalStore } from "../stores/global.js";
import { noticeStore } from "../stores/notice.js";
import { loaderStore } from "../stores/loader.js";

import Panel from "../components/Panel.vue";

export default {
  name: "Merchant",
  components: {
    Panel
  },
  props: {
    connected:{
      type: Boolean,
      required: true
    },
    id:{
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    type:{
      type: String,
      required: true
    },
    expires:{
      type: String,
      required: true
    },
    merchantID: {
      type: String,
      required: true
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(globalStore, {
      imageURL: (store) => store.imageURL
    })
  },
  methods: {
    getMerchantType: function (pos) {
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
    deletePOS: function (id) {
      const gs = globalStore();
      const ls = loaderStore();

      const msg = 'Are you sure you want to delete this connected POS system? This change is irreversible.';

      gs.confirmUserAction(msg).then((confirmed) => {
        const ns = noticeStore();

        if (confirmed) {
          ls.showLoader();
          gs.deletePOS(id).then((resp) => {
            if (resp.status === 200) {
              gs.loadGlobalData().then(() => {
                ls.hideLoader();
                ns.showNotice(resp.data.message, resp.data.status);
              });
            } else {
              ns.showNotice(resp.message, resp.status === 200);
            }
          })
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>