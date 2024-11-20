<template>
  <div :class="getClassObject">
    <div class="noticeMsg" v-html="msg"></div>
    <div class="noticeClose" @click.prevent="$emit('dismiss')">
     <p>&times;</p>
    </div>
  </div>
</template>

<script>

import notice from '../stores/notice';

export default {
  name: "Notice",
  emits:['dismiss'],
  data() {
    return {};
  },
  props: {
    msg:{
      type: String,
      required: false,
      default: ''
    },
    visible:{
      type: Boolean,
      required: false,
      default: false
    },
    status:{
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    getClassObject() {
      return { 'notice': true, 'visible': this.visible, 'success': this.status, 'error': !this.status }
    }
  },
  methods: {
    hideNotice: function(){
      const ns = noticeStore();
      ns.hideNotice();
    }
  }
};
</script>

<style lang="scss" scoped></style>