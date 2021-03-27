<template>
  <div class="nav">
    <router-link to="/money">
      money
      <svg>
        <use xlink:href="#label"></use>
      </svg> </router-link
    >| <router-link to="/labels">labels</router-link>|
    <router-link to="/statistic">statistic</router-link>
  </div>
</template>

<script lang="ts">
// import x from "@/assets/icons/label.svg";
// console.log(x);
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
.nav {
  border: 1px solid red;
}
</style>