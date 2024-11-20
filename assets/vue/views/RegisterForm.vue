<template>
  <div :class="[{ registerForm: true, isActive: active }]" v-if="active">
    <form @submit.prevent="registerNewUser" ref="registerForm" validate>
      <input type="hidden" :value="register.nonce" name="nonce" />
      <input type="hidden" :value="register.action" name="action" />

      <div :class="[{ 'form-control': true, inlineForm: true }]">
        <div class="field-control half">
          <label>First Name: </label>
          <input type="text" value="" name="firstName" placeholder="First Name" tabindex="1" required />
        </div>

        <div class="field-control half">
          <label>Last Name: </label>
          <input type="text" value="" name="lastName" placeholder="Last Name" tabindex="2" required />
        </div>

        <div class="field-control full">
          <label>Email: </label>
          <input type="email" value="" name="email" placeholder="Email" tabindex="3" required />
        </div>

        <div class="field-control half">
          <label>Password: </label>
          <input type="password" value="" name="password" placeholder="Password" required tabindex="4"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?])[A-Za-z\d@$!%*?]{8,}$" />
        </div>

        <div class="field-control half">
          <label>Confirm Password: </label>
          <input type="password" value="" name="confirmPass" placeholder="Confirm Password" required tabindex="5"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?])[A-Za-z\d@$!%*?]{8,}$" />
        </div>
      </div>

      <div class="submit">
        <div>
          <ul class="passwordRequirements">
            <li>Has minimum 8 characters in length.</li>
            <li>At least one uppercase English letter.</li>
            <li>At least one lowercase English letter.</li>
            <li>At least one digit.</li>
            <li>At least one special character. (#?!*-)</li>
          </ul>
        </div>
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
  props: {
    active: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    ...mapState(globalStore, {
      register: (store) => {
        return {
          nonce: store.endpoints.register.nonce,
          action: store.endpoints.register.action,
        };
      },
      showLoginForm: store => store.showLoginForm,
      showRegisterForm: store => store.showRegisterForm,
      showPasswordForm: store => store.showPasswordForm,
    })
  },
  methods: {
    ...mapActions(globalStore, ["registerUser", "loadGlobalData", "toggleLoginForm", "toggleRegisterForm", "togglePasswordForm"]),
    registerNewUser: function () {
      const data = new FormData(this.$refs.registerForm);

      this.registerUser(data).then((resp) => {
        const id = resp.data?.data?.id;

        if(resp.data.status && id){
          setTimeout(() => {
            location.reload()
          }, 2000);
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped></style>
