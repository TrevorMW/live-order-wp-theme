<template>
  <div :class="[{ passwordForm: true, isActive: active }]" v-if="active">
    <form @submit.prevent="resetPassword" ref="lostPasswordForm">
      <input type="hidden" :value="password.nonce" name="nonce" />
      <input type="hidden" :value="password.action" name="action" />

      <label>Email: </label>
      <input type="text" value="" name="username" placeholder="Username" />

      <div class="submit">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { globalStore } from "../stores/global.js";
import { noticeStore } from "../stores/notice";

import axios from "Axios";

export default {
  name: "LoginForm",
  data() {
    return {
      showLoginForm: true,
      showRegisterForm: false,
      showPasswordForm: false,
    };
  },
  props:{
    active:{
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    ...mapState(globalStore, {
      password: (store) => {
        return {
          nonce: store.endpoints.password.nonce,
          action: store.endpoints.password.action,
        };
      },
      showLoginForm: store => store.showLoginForm,
      showRegisterForm: store => store.showRegisterForm,
      showPasswordForm: store => store.showPasswordForm,
    }),
  },
  methods: {
    ...mapActions(globalStore, ["resetUserPassword", "loadGlobalData", "toggleLoginForm", "toggleRegisterForm", "togglePasswordForm"]),
    resetPassword: function () {
      const data = new FormData(this.$refs.registerForm);

      resetUserPassword(data).then(() => {
        loadGlobalData().then(() => {
          setTimeout(() => {
              window.location.href = "/";
            }, 2000);
        })
      })
    }
  },
};
</script>

<style lang="scss" scoped></style>
