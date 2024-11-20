<template>
  <div v-if="loaded" class="container flexed pageHeader">
    <header class="">
      <img v-if="type" :src="getPOSType(type)" />
      <h1>{{ merchantName }}</h1>
    </header>
    <div>
      <a @click.prevent="backToProfile()"> &larr; Back to Profile</a>
    </div>
  </div>
  <hr />
  <div class="container pageBody page-restaurant" v-if="loaded">
    <section>
      <header>
        <div>
          <h3>Api oAuth Connection Status </h3>
          <p>Details about the current oAuth connection</p>
        </div>
        <div>

        </div>
      </header>
      <div class="container oauthStatusPanels">
        <p>API connection: 
          <span :class="[{ 'material-symbols-outlined': true, 'wifi': true, 'connected': oauth?.isConnected, 'disconnected': oauth && !oauth.isConnected, 'merchantAPIConnection': true }]">{{ oauth?.isConnected ? 'wifi' : 'wifi_off' }}</span>&nbsp; 
          <span :class="[{ 'success': oauth?.isConnected, 'error': !oauth?.isConnected}]">{{ oauth?.isConnected ? 'Connected' : 'Disconnected' }}</span> 
          <a v-if="oauth && !oauth.isConnected" @click.prevent="reauthorize" class="btn btn-small btn-tertiary">Re-Authorize</a>
        </p>
        <p v-if="oauth?.isConnected">API token expires on: {{ oauth?.expiration }}</p>
        <p v-else><br />This account is disconnected from Square. Please Reauthorize your oAuth connection to
          continue.</p><br />
        <p>Authorized Scopes:</p>
        <ul class="authorizedScopesList">
          <li v-for="(scope, idx) in oauth?.scopes" :key="idx">{{ scope.replace('_', ' ') }}</li>
        </ul>

        <!-- <Panel :class="[{ 'panelOauthScopes': true }]">
          <template #header>
            
          </template>
          <template #action>
            
          </template>
          <template #content>
            
          </template>
        </Panel> -->

        <!-- <Panel v-if="oauth?.scopes?.length > 0" :class="[{ 'panelOauthScopes': true }]">
          <template #header>
            Square API Authorized Scopes
          </template>
          <template #content>
           
          </template>
        </Panel> -->
      </div>
    </section>

    <hr />

    <section class="locations">
      <header>
        <div>
          <h3>All Restaurants for {{ name }}</h3>
          <p>All Restaurants for this merchant account. </p>
        </div>
        <div></div>
      </header>
      <div v-if="loaded">
        <div class="container" v-if="this.locations.length > 0">
          <Location v-for="loc in locations" :key="loc.id" 
                    :name="loc.name" 
                    :type="loc.postype" 
                    :id="loc.locationID"
                    :isSetup="loc.isSetup" 
                    :merchantID="ID" 
                    :merchantPostID="this.merchantID"
                    :locationID="loc.id"
                    :locationPostID="loc.locationID"
                    :timezone="loc.timezone" />
        </div>
        <NoItems v-else icon="dns"
          message="There are no locations. To add a location, please follow setup instructions for creating a business in your POS system" />
      </div>
      <GlobalLoader v-else />
    </section>

    <hr />

    <section class="activeSubscriptions">
      <header>
        <div>
          <h3>Subscriptions</h3>
          <p>Current Data on Active App Subscriptions</p>
        </div>
        <!-- <div>
        <a @click.prevent="cancelSubscription" class="btn btn-secondary">Upgrade to Paid Plan</a>&nbsp;&nbsp;
        <a @click.prevent="cancelSubscription" class="btn btn-tertiary">Cancel Subscription</a>
      </div> -->
      </header>
      <div class="container" v-if="subscription !== null">
        <p>Subscription Status: <span :class="`status-${subscription?.status?.toLowerCase()}`">{{ subscription?.status }}</span></p>
        <p>Plan Type: <strong>{{ subscription?.plan?.name }}</strong></p>
        <p v-if="subscription?.billingDate">Next Billing Date: <strong>{{ subscription?.billingDate }}</strong></p>
        <br />

        <Panel :class="[{ 'panelSubscriptionDetails': true }]">
          <template #header>
            Subscription Billing Details
          </template>
          <template #content>
            <NoItems icon="cycle" message="You have not yet been billed for your subscription." />
          </template>
        </Panel>
      </div>
      <div v-else>
        <NoItems icon="money" message="No subscription details available for your account." />
      </div>
    </section>
  </div>
  <GlobalLoader v-else />
</template>

<script>
import { toRaw } from 'vue';
import { mapState } from 'pinia';
import { globalStore } from "../stores/global.js";
import { loaderStore } from "../stores/loader.js";
import { merchantStore } from "../stores/merchant.js";
import { restaurantStore } from "../stores/restaurant.js";

import Panel from '../components/Panel.vue';
import NoItems from '../components/NoItems.vue';
import Location from '../components/Location.vue';
import GlobalLoader from '../components/GlobalLoader.vue';

export default {
  name: "Merchant",
  components: {
    Panel,
    NoItems,
    Location,
    GlobalLoader
  },
  data() {

  },
  mounted() {
    const ms = merchantStore();
    let merchantID = null;

    if ('id' in this.$router.currentRoute.value.params) {
      merchantID = this.$router.currentRoute.value.params.id;
    }

    ms.loadMerchantData(merchantID);
  },
  computed: {
    ...mapState(globalStore, {
      imageURL: (store) => store.imageURL,
      disconnect: (store) => {
        return {
          nonce: store.endpoints.disconnect_oauth.nonce,
          action: store.endpoints.disconnect_oauth.action
        }
      },
      reauth: (store) => {
        return {
          nonce: store.endpoints.reauthorize_oauth.nonce,
          action: store.endpoints.reauthorize_oauth.action
        }
      }
    }),
    ...mapState(merchantStore, {
      loaded: store => store.loaded,
      ID: store => store.merchant?.ID,
      name: store => store.merchant?.name,
      oauth: store => store.merchant?.oauth,
      type: store => store.merchant?.type,
      merchantID: store => store.merchant?.merchantID,
      subscription: store => store.merchant?.subscription,
      locations: store => store.locations,

    }),
    merchantName: function () {
      return `${this.name}`;
    }
  },
  methods: {
    closeModal: function () {
      this.isOpen = false;
    },
    fieldChange: function (e) {
      this.settings.changed = true;
    },
    disconnectOauth: function () {
      const ms = merchantStore();
      const rs = merchantStore();
      const data = new FormData();

      data.append('id', this.ID);
      data.append('action', this.disconnect.action);
      data.append('nonce', this.disconnect.nonce);

      ms.disconnectOauth(data).then(() => {
        rs.loadRestaurantData(this.ID);
      });
    },
    reauthorize: function () {
      const ms = merchantStore();
      const rs = restaurantStore();
      const ls = loaderStore();

      ls.showLoader();

      const data = new FormData();

      if (!this.ID) {
        if ('id' in this.$router.currentRoute.value.params) {
          data.append('id', this.$router.currentRoute.value.params.id);
        }
      } else {
        data.append('id', this.ID);
      }

      data.append('action', this.reauth.action);
      data.append('nonce', this.reauth.nonce);

      ms.reauthorizeOauth(data).then((resp) => {
        if (resp.status === 200 && !resp.data.status) {
          window.location.href = resp.data.redirectURL;
        } else {
          rs.loadRestaurantData(this.ID).then(() => {
            ls.hideLoader();
          });
        }
      });
    },
    cancelSubscription: function () {
      const rs = restaurantStore();
      const ls = loaderStore();

      ls.showLoader();

      const data = new FormData();

      data.append('id', this.ID);
      // data.append('action', this.cancelSub.action);
      // data.append('nonce', this.cancelSub.nonce);

      // rs.cancelSubscription(data).then(() => {
      //   rs.loadRestaurantData(this.ID).then(() => {
      //     ls.hideLoader();
      //   });
      // });
    },
    getPOSType(pos) {
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
    backToProfile(){
      this.$router.push({ name: 'Profile' });
    }
  },
};
</script>

<style lang="scss" scoped></style>