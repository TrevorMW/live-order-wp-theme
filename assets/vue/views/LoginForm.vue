<template>
  <div :class="[{ loginForm: true, isActive: active }]" v-if="active">
    
    <form @submit.prevent="submitLoginInfo" ref="loginForm">
      <input type="hidden" :value="login.nonce" name="nonce" />
      <input type="hidden" :value="login.action" name="action" />

      <div :class="[{ 'form-control': true, inlineForm: true }]">
        <div class="field-control half">
          <label>Email: </label>
          <input type="text" value="" name="email" placeholder="Email Address" />
        </div>

        <div class="field-control half">
          <label>Password: </label>
          <input type="password" value="" name="password" placeholder="Password" />
        </div>
      </div>

      <div class="submit">
        <p>
          Forgot Password?
          <a href="" @click.prevent="togglePasswordForm">Reset your password.</a>
        </p>
        <button type="submit" class="btn btn-primary">Login</button>
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
    return {}
  },
  props:{
    active:{
      type: Boolean,
      required: true,
      default: true
    }
  },
  computed: {
    ...mapState(globalStore, {
      login: (store) => {
        return {
          nonce: store.endpoints.login.nonce,
          action: store.endpoints.login.action,
        };
      }
    }),
  },
  methods: {
    ...mapActions(globalStore, ["logUserIn", "loadGlobalData", "toggleLoginForm", "toggleRegisterForm", "togglePasswordForm"]),
    submitLoginInfo: function () {
      const data = new FormData(this.$refs.loginForm);

      this.logUserIn(data).then((resp) => {
        const status = resp.data.status;
        this.loadGlobalData().then( () => {
          if(status){
            setTimeout(() => {
              window.location.href = "/profile";
            }, 2000);
          }
        });
      })
    },
    
  },
};
</script>

<style lang="scss" scoped></style>
