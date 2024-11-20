<template>
  <div>
    <!-- <div class="fuzzySearch" v-if="loaded">
      <span class="material-symbols-outlined">search</span>
      <input
        type="search"
        @onKeyUp="fuzzySearch($event.target.value)"
        placeholder="Type to search..."
      />
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { globalStore } from "../stores/global.js";
import { scStore } from "../stores/servicecharge.js";

import axios from "Axios";

export default {
  name: "Utils",
  created() {},
  data() {
    return {};
  },
  props: {},
  computed: {
    ...mapState(globalStore, {
      logoutURL: (store) => store.logoutURL,
      username: (store) => store.user.username,
      email: (store) => store.user.email,
      id: (store) => store.user.id,
      action: (store) => store.endpoints.logout.action,
      nonce: (store) => store.endpoints.logout.nonce,
      restaurantSet: (store) => store.isRestaurantSet,
      currentRestaurant: (store) => store.currentRestaurant,
    }),
    ...mapState(scStore, {
      loaded: (store) => store.dataLoaded,
    }),
    hasSearchableItems: function () {
      return document.querySelectorAll("[data-fuzzy]").length > 0;
    },
  },
  methods: {
    ...mapActions(globalStore, ["unsetCurrentRestaurant"]),
    showUserPage: function () {},
    logUserOut: function () {
      const url = core.ajaxUrl;
      const data = new FormData();

      data.append("action", this.action);
      data.append("nonce", this.nonce);

      axios.post(url, data).then((resp) => {
        window.location.reload();
      });
    },
    fuzzySearch: function (val) {
      function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }

      function fuzzyMatch(pattern, str) {
        pattern =
          ".*" +
          pattern
            .split("")
            .map((l) => `${escapeRegExp(l)}.*`)
            .join("");
        const re = new RegExp(pattern);
        return re.test(str);
      }

      $fuzzyItems = document.querySelectorAll("[data-fuzzy]");

      if ($fuzzyItems.length > 0) {
        $fuzzyItems.array.forEach((element) => {
          element.hide();
        });

        $fuzzyItems.array.forEach((element) => {
          if (fuzzyMatch(element.dataset.fuzzy, val)) {
            element.show();
          }
        });
      }
    },
    handleUnsetRedirect: function () {
      this.$router.push("/profile");
    },
    disconnectPOS: function () {
      const gs = globalStore();

      gs.unsetCurrentRestaurant(this.id).then(() => {
        gs.loadGlobalData().then(() => {
          this.handleUnsetRedirect();
        });
      });
    },
    editRestaurant: function(){
      this.$router.push({ name: 'Restaurant', params: { id: this.currentRestaurant.ID }});
    }
  },
};
</script>

<style lang="scss" scoped></style>
