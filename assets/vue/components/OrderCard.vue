<template>
  <div>
    <!-- <pre style="font-size:8px;">{{ this.order }}</pre> -->

    <a class="orderPillbox" href="" @click.prevent="this.$emit('viewOrderDetails', { order: order })">
      
      <div v-if="order.source" class="olicCompany">
        <SourceLogo :source="order.source" />
      </div>

      <div class="olicUserDetails">
        <UserDetails :order="order" />
      </div>

      <div class="olicTimeTillReady">
        <strong>{{ this.order.timeTillReady }}</strong>
        <small v-if="this.order.timeTillReady > 0">min</small>
      </div>

      <!-- <div class="olicUserDetails">
        <UserDetails :order="order" />
      </div>
      
      <div class="olicStatus">
        <Status :order="order" />
      </div> -->
    
    

      <!-- <div v-if="order.source" class="olicUserDetails">
        <UserDetails :order="order" />
      </div>
      <div v-else class="olicUserDetails">
        {{ order.id }}
      </div>
      <div class="olicPickupDetails">

      </div>
      <div class="olicStatus">
        <Status :order="this.order" />
      </div>
  
      <pre style="font-size:7px;">{{ order }}</pre>
      <div class="olicUserDetails">
        <UserDetails :order="order" />
      </div>
      <div class="olicPickupDetails">
      </div>
      <div class="olicStatus">
        <Status :order="this.order" />
      </div> -->
    </a>
  </div>
</template>

<script>

import SourceLogo from '../components/SourceLogo.vue';
import TimeTillReady from '../components/order/TimeTillReady.vue';
import UserDetails from '../components/order/UserDetails.vue';
import Status from '../components/order/Status.vue';

export default {
  name: "OrderCard",
  components: {
    SourceLogo,
    TimeTillReady,
    UserDetails,
    Status
  },
  emits: ['viewOrderDetails'],
  data() {
    return {};
  },
  props: {
    order: {
      type: Object,
      required: true,
      default: () => { }
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>