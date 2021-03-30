<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
      >
        {{ tag.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="createLabel">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import createTag from "@/mixins/createTag";
@Component
export default class Tags extends mixins(createTag) {
  get tagList() {
    return this.$store.state.labelList;
  }
  @Prop(Array) readonly selectedLabs!: string[];
  selectedTags: string[] = this.selectedLabs;
  created() {
    this.$store.commit("fetchLabelList");
  }
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      return;
    }
    this.selectedTags.push(tag);
  }
  @Watch("selectedTags")
  onUpdateSelectedTags(value: string[]) {
    this.$emit("update:selectedLabs", value);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: #fff;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    max-height: 84px;
    margin-right: -5px;
    > li {
      background: #d9d9d9;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;
      margin-bottom: 4px;
      &.selected {
        background: red;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      padding: 0 4px;
      color: #999;
    }
  }
}
</style>