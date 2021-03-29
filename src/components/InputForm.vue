<template>
  <div>
    <label class="notes">
      <span class="name">{{ labelName }}</span>
      <input type="text" :placeholder="placeHolder" v-model="notes" />
    </label>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
@Component
export default class Note extends Vue {
  @Prop(String) value!: string;
  @Prop() labelName!: string;
  @Prop() placeHolder?: string;
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
  display: block;
  display: flex;
  padding-left: 16px;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    border: none;
    background: transparent;
    padding-right: 16px;
    flex-grow: 1;
  }
}
</style>