<template>
  <div class="nav">
    <router-link to="/money">
      <icon name="label"></icon>
      money
    </router-link>
    <router-link to="/labels">
      <icon name="money"></icon>
      labels
    </router-link>
    <router-link to="/statistic">
      <icon name="statistics"></icon>
      static
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
.nav {
  border: 1px solid red;
}
</style>