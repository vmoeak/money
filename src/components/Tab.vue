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
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 24px;
  margin: 10px 20px 0;
  &-item {
    width: 45%;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: #f0f0f0;
    border-radius: 10px;
  }
}
.selected {
  background: #ff9327;
  color: #fff;
}
</style>