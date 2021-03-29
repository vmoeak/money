<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in dataSource"
        :key="tag"
        @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
      >
        {{ tag.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="add">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import labelListModel from "@/models/labelModel";
@Component
export default class Tags extends Vue {
  @Prop(Array) readonly dataSource!: string[];
  @Prop(Array) readonly selectedLabs!: string[];
  selectedTags: string[] = this.selectedLabs;
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      return;
    }
    this.selectedTags.push(tag);
  }
  add() {
    const name = prompt("请输入标签名称");
    if (!name) {
      alert("内容不能为空");
      return;
    }
    const message = labelListModel.create(name);
    if (message === "duplicated") {
      alert("标签名字重复");
      return;
    } else if (message === "success") {
      alert("添加标签成功");
    }
  }
  @Watch("selectedTags")
  onUpdateSelectedTags(value: string[]) {
    this.$emit("update:selectedLabs", value);
  }
}
</script>

<style lang="scss" scoped>
.tags {
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