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

<script lang="js">
export default {
  name: "Layout",
  props: ["classFix"],
  data() {
    return {
      isWeixin: navigator.userAgent.match(/MicroMessenger/ig),
    };
  },
  created() {
    // 如果是微信浏览器，调用此方法，使微信浏览器底部导航栏一开始就出现
    if (this.isWeixin) window.history.pushState({}, "/", "#");
  },
  mounted() {
    // 计算正确的视口
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
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
// 解决chrome浏览器视口计算不准问题
@media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
  .navWrapper {
    height: calc(var(--vh, 1vh) * 100);
  }
}
/* Avoid Chrome to see Safari hack */
@supports (-webkit-touch-callout: none) {
  .navWrapper {
    /* The hack for Safari */
    height: -webkit-fill-available;
  }
}
</style>