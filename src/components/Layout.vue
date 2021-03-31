<template>
  <div>
    <div class="navWrapper">
      <div class="content" :class="classFix && `${classFix}-content`">
        <slot></slot>
      </div>
      <Nav />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Layout",
  props: ["classFix"],
};
</script>

<style lang="scss" scoped>
.navWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .content {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>