<template>
  <div class="container flexed pageHeader">
    <div>
      <h1>Hello, {{ getGreeting }}</h1>
    </div>
  </div>

  <div class="container pageBody page-profile">
    <section class="generalInfo">
      <header>
        <div>
          <h3>General Info</h3>
          <p>Basic settings, subscription details, &amp; password management</p>
        </div>
        <div>
          <button @click="changePassword(this.email)" :class="[{ 'btn btn-small btn-primary': true }]">
            Reset Password
          </button>
        </div>
      </header>
      <div class="userAccountData">
        <p><strong>Username:</strong> {{ this.username }}</p>
        <p><strong>Email:</strong> {{ this.email }}</p>
      </div>
    </section>

    <hr />

    <section class="potentialPOSSystems">
      <header>
        <div>
          <h3>Connect a new POS System</h3>
          <p>
            Connect to one or multiple POS systems to get service charge data for each POS
            system.
          </p>
        </div>
        <div></div>
      </header>
      <div class="posSystemChoices alignLeft" v-if="systems">
        <a v-for="(system, idx) in systems" :key="idx" class="posChoice" :class="posChoiceClass(system.name)" @click.prevent="handleOauthRedirect(system)" >
          <img :src="getMerchantType({ value: system.type })" :alt="system.name" :title="system.name" />
        </a>
      </div>
      <NoItems v-else icon="dns" message="There are no supported POS Systems supported currently. Please come back when some POS Systems are supported." />
    </section>

    <hr />

    <section class="potentialPOSSystems">
      <header>
        <div>
          <h3>Connected Merchant Accounts</h3>
          <p>All your currently connected merchant accounts.</p>
        </div>
        <div></div>
      </header>
      <div class="connectedPOSSystems" v-if="loaded">
        <div class="container flexed authorizedRestaurants" v-if="this.merchants.length > 0">
          <Merchant v-for="merch in merchants" :key="merch.id" 
                    :connected="merch.connected" 
                    :name="merch.name"
                    :type="merch.type"
                    :id="merch.id"
                    :expires="merch.expires_on"
                    :merchantID="merch.merchantID" />
        </div>
        <NoItems v-else icon="dns" message="There are no connected POS Systems (Merchant Accounts). To connect, please choose an option from list of oAuth providers." />
      </div>
      <GlobalLoader v-else />
    </section>

  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { globalStore } from "../stores/global.js";
import { noticeStore } from "../stores/notice.js";
import { loaderStore } from "../stores/loader.js";
import { scStore } from "../stores/servicecharge.js";

import GlobalLoader from "../components/GlobalLoader.vue";
import Panel from "../components/Panel.vue";
import NoItems from "../components/NoItems.vue";
import Merchant from "../components/Merchant.vue";

export default {
  name: "Profile",
  components: {
    Panel,
    NoItems,
    GlobalLoader,
    Merchant
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(globalStore, {
      logoutURL: (store) => store.logoutURL,
      imageURL: (store) => store.imageURL,
      username: (store) => store.user.username,
      firstName: (store) => store.user.firstName,
      email: (store) => store.user.email,
      id: (store) => store.user.id,
      action: (store) => store.endpoints.logout.action,
      nonce: (store) => store.endpoints.logout.nonce,
      merchants: (store) => store.merchantAccounts,
      currentRestaurant: (store) => store.currentRestaurant,
      loaded: (store) => store.loaded,
      systems: store => store.posSystems,
      endpoints: (store) => store.endpoints
    }),
    ...mapState(scStore, {
      dataLoaded: (store) => store.dataLoaded,
    }),
    getGreeting: function () {
      return this.firstName !== null ? this.firstName : this.username;
    },
  },
  mounted() {
    this.$emit("componentLoaded");
  },
  watch: {
    '$route': {
      handler: function (data) {
        const ns = noticeStore();
        const uri = data.fullPath.replace('#_=_', '');
        const params = this.getParamsFromURI(decodeURIComponent(uri));

        if(params.get('status') && params.get('message')){
          ns.showNotice(params.get('message'), params.get('status'));
        }
      },
      immediate: true
    }
  },
  props: {},
  methods: {
    ...mapActions(globalStore, ['setCurrentRestaurant', 'resetUserPassword']),
    isAPIConnected: function (connected) {
      return connected;
    },
    getParamsFromURI: function (uri) {
      // Get everything after the `?`
      const [, paramString] = uri.split('?');

      // Return parameters
      return new URLSearchParams(paramString);
    },
    posChoiceClass: function (label) {
      return `pos${label}`;
    },
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
    reauthApp: function () 
    { },
    setPOSAsActive: function (id, user_id) {
      const gs = globalStore();
      const ns = noticeStore();

      gs.setCurrentRestaurant(id, user_id).then((resp) => {
        if(resp.status === 200){
          gs.loadGlobalData().then(() => {
            this.handleRestaurantRedirect();
            ns.showNotice('You are now connected to  ', true);
          });
        }
      });
    },
    handleRestaurantRedirect: function () {
      this.$router.push("/dashboard");
    },
    changePassword: function(email) 
    {
      const data = new FormData();

      data.append('email', email);
      data.append('action', this.endpoints.password.action);
      data.append('nonce', this.endpoints.password.nonce);

      this.resetUserPassword(data).then((resp) => {
        debugger;
        const ns = noticeStore();
        ns.showNotice(resp.data.message, resp.data.status);
      });
    },
    handleOauthRedirect(system){
      // if we have an authorize link, assume this pos system is active and enabled.
      if(system.authorizeLink){
        window.location.href = system.authorizeLink;
      } 
      // otherwise, lets say, "coming soon!"
      else {
        const ns = noticeStore();
        ns.showNotice(`Connecting to ${system.name} is coming soon, but not yet possible!`, false);
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
