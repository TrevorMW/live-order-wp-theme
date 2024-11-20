<template>
  <section class="panel" :class="classes">
    <div class="panel-header">
      <div>
        <slot name="header"></slot>
      </div>
      <div class="panel-action">
        <slot name="action"></slot>
      </div>
    </div>
    <div class="panel-content">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script>

export default {
  name: "Panel",
  props:{
    classes: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {},
};

</script>

<style lang="scss" scoped></style>