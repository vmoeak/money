<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <icon name="label"></icon>
      money
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <icon name="money"></icon>
      labels
    </router-link>
    <router-link to="/statistic" class="item" active-class="selected">
      <icon name="statistics"></icon>
      static
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  display: flex;
  font-size: 12px;
  background: #fff;
  border-top: 1px solid #eee;
  .item {
    width: 33.333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2px 0;
    color: #d6dde5;
  }
  .icon {
    width: 32px;
    height: 32px;
  }
  .item.selected {
    color: #ff9327;
  }
}
</style>