<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        @click="toggle(tag)"
        :class="{ selected: tag === seletedTag }"
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
  @Prop() seletedTag!: Tag;
  currentTag = this.seletedTag;
  get tagList() {
    return this.$store.state.labelList;
  }
  @Prop(Array) readonly selectedLabs!: string[];
  selectedTags: string[] = this.selectedLabs;
  created() {
    this.$store.commit("fetchLabelList");
  }
  toggle(tag: Tag) {
    console.log("tag:");
    if (this.currentTag === tag) {
      this.currentTag = { name: "", id: "" };
      return;
    }
    this.currentTag = tag;
  }
  @Watch("currentTag")
  onUpdateSelectedTags(value: Tag) {
    this.$emit("update:seletedTag", value);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: #fff;
  font-size: 14px;
  margin: 20px 0;
  padding: 5px 20px;
  flex-grow: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    margin-right: -5px;
    > li {
      background: #f0f0f0;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;
      margin-bottom: 8px;
      &.selected {
        background: #ff9327;
        color: #fff;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: #ff9327;
      color: #fff;
      border: none;
      border: 1px solid #eee;
      padding: 4px 8px;
      border-radius: 4px;
    }
  }
}
</style>