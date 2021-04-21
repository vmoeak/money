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
    this.currentTag = tag;
    // const index = this.selectedTags.indexOf(tag);
    // if (index >= 0) {
    //   this.selectedTags.splice(index, 1);
    //   return;
    // }
    // this.selectedTags.push(tag);
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
  margin: 20px;
  padding: 5px;
  padding-left: 26px;
  flex-grow: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #eee;
  border-radius: 5px;
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
      margin-bottom: 4px;
      &.selected {
        background: #ffbc79;
        color: #fff;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: #ffd8c2;
      border: none;
      border: 1px solid #eee;
      padding: 4px 8px;
      border-radius: 4px;
    }
  }
}
</style>