<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok">Ok</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  @Prop(Number) value!: number;
  output = this.value.toString();
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent as string;
    if (this.output.length > 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
        return;
      }
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    this.output += input;
  }
  clear() {
    this.output = "0";
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
      return;
    }
    this.output = this.output.slice(0, -1);
  }
  ok() {
    this.$emit("update:value", parseFloat(this.output));
    this.$emit("submit");
  }
  mounted() {
    (this as any).$eventBus.$on("saveSucced", () => {
      this.output = "0";
    });
  }
  beforeDestory() {
    (this as any).$eventBus.$off("saveSucced");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    // @extend %innerShadow;
    font-family: Consolas, monospace;
    padding: 0 16px;
    font-size: 36px;
    text-align: right;
    margin: 9px 20px;
    border: 1px solid #edeae4;
    border-radius: 10px;
  }
  .buttons {
    @extend %clearFix;
    font-size: 20px;
    > button {
      background: transparent;
      width: 25%;
      height: 48px;
      float: left;
      border: none;
      &.ok {
        height: 48 * 2px;
        float: right;
      }
      &.zero {
        width: 50%;
      }
      $bg: #f3eeeb;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 1.5 * 4%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 2 * 4%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 2.5 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 3 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 3.5 * 5%);
      }
    }
  }
}
</style>