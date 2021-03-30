<template>
  <div>
    <ul class="types">
      <li
        v-for="item in dataSource"
        :key="item.value"
        class="types-item"
        :class="{
          selected: value === item.value,
          [classFix + '-item']: classFix,
        }"
        @click="seletedType(item.value)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Types extends Vue {
  @Prop(String) readonly value!: string;
  @Prop() readonly classFix?: string;
  @Prop({ required: true, type: Array }) dataSource!: {
    text: string;
    value: string;
  }[];
  type = this.value;
  seletedType(type: string) {
    this.type = type;
  }
  @Watch("type")
  onTypeChange(changeValue: string) {
    this.$emit("update:value", changeValue);
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>