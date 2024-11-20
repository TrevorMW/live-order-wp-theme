<template>
  <div class="">
    <h2>Service Charge Calculator</h2>
  </div>
  <div class="authenticationForms">
    <LoginForm :active="showLoginForm" />
    <RegisterForm :active="showRegisterForm" />
    <PasswordResetForm :active="showPasswordForm" />

    <div class="container flexed credits" v-if="showLoginForm">
      <div>
        A Signviu Product, &copy; 2024
      </div>
      <div class="">
        Not currently a user?
        <a href="" @click.prevent="toggleRegisterForm">Register Now!</a>
      </div>
    </div>

    <div class="container flexed credits" v-if="showRegisterForm">
      <div>
        A Signviu Product, &copy; 2024
      </div>
      <div class="">
        <p>Already a user? <a href="" @click.prevent="toggleLoginForm">Login Here</a>.</p>
      </div>
    </div>

    <div class="container flexed credits" v-if="showPasswordForm">
      <div>
        A Signviu Product, &copy; 2024
      </div>
      <div class="">
        <a href="" @click.prevent="toggleLoginForm">&larr; Return to Login Form</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { globalStore } from "../stores/global.js";
import { noticeStore } from "../stores/notice";

import LoginForm from '../views/LoginForm.vue';
import RegisterForm from '../views/RegisterForm.vue';
import PasswordResetForm from '../views/PasswordResetForm.vue';

import axios from "Axios";

export default {
  name: "Authentication",
  components: {
    LoginForm,
    RegisterForm,
    PasswordResetForm
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(globalStore, {
      showLoginForm: store => store.showLoginForm,
      showRegisterForm: store => store.showRegisterForm,
      showPasswordForm: store => store.showPasswordForm,
    }),
  },
  methods: {
    ...mapActions(globalStore, ["toggleLoginForm", "toggleRegisterForm", "togglePasswordForm"]),
  },
};
</script>

<style lang="scss" scoped></style>
