<template>
  <div :class="[{ 'modal': true, 'modalWrapper': true, 'isActive': isOpen }]">
    <a class="modalClose" @click.prevent="$emit('close')">&times;</a>
    <div class="modalInner">
      <header class="modalHeader">
        <slot name="modalHeader"></slot>
      </header>
      <div class="modalBody">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  emits:['close'],
  created() { },
  data() {
    return {};
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped></style>