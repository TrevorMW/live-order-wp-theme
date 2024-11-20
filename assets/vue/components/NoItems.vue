<template>
  <div class="noItemsFound container">
    <div v-if="icon" class="noItemsIcon">
      <span class="material-symbols-outlined">{{ icon }}</span>
    </div>
    <div v-if="message" class="noItemsMessage"><p>{{ message }}</p></div>
    <button v-if="action && actionMessage" class="btn btn-tertiary" @click.prevent="$emit(this.action)">{{ actionMessage }}</button>
  </div>
</template>

<script>
export default {
  name: "NoItems",
  props:{
    icon: {
      type: String,
      required: false,
      default: null
    },
    message: {
      type: String,
      required: false,
      default: null
    },
    action: {
      type: String,
      required: false,
      default: null
    },
    actionMessage: {
      type: String,
      required: false,
      default: null
    }
  }  
};
</script>

<style lang="scss">

.noItemsFound{
  text-align:center;
  color:#ccc;
  padding:50px 0;
}

.noItemsIcon{

  span{
    font-size:50px;
    font-weight:300;
  }
}

.noItemsMessage{
  max-width:400px;
  margin: 0 auto;

  p{
    color:#ccc;
    margin: 10px 0 21px 0;
  }
}

</style>