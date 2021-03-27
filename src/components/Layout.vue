<template>
  <div>
    <div class="navWrapper">
      <div class="content">
        <slot></slot>
      </div>
      <Nav />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.navWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 1px solid green;
  .content {
    flex-grow: 1;
    overflow: hidden;
  }
}
</style>