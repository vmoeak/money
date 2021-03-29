<template>
  <div>
    <Layout>
      <ul class="tagList">
        <li v-for="label in labels" :key="label">
          <span>{{ label.name }}</span>
          <icon name="arrow" />
        </li>
      </ul>
      <div class="create-tag-wrapper">
        <button class="create-tag" @click="add">编辑标签</button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import labelListModel from "@/models/labelModel";

labelListModel.fetch();
@Component
export default class Label extends Vue {
  labels = labelListModel.data;
  add() {
    const name = prompt("请输入标签名称");
    if (name) {
      const message = labelListModel.create(name);
      alert(message);
      return;
    }
    alert("输入内容不能为空");
  }
}
</script>

<style lang="scss" scoped>
.tagList {
  background: #fff;
  padding-left: 16px;
  > li {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    > svg {
      margin-right: 16px;
      height: 18px;
      width: 18px;
      color: #666;
    }
  }
}
.create-tag {
  background: #767676;
  color: #fff;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    margin-top: 44px;
  }
}
</style>