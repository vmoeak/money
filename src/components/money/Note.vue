<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="输入备注" v-model="notes" />
    </label>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
@Component
export default class Note extends Vue {
  @Prop(String) value!: string;
  notes = this.value;
  @Watch("notes")
  onValueChange(newValue: string) {
    this.$emit("update:value", newValue);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: block;
  display: flex;
  padding-left: 16px;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    border: none;
    background: transparent;
    padding-right: 16px;
    flex-grow: 1;
  }
}
</style>