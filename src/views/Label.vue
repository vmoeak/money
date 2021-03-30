<template>
  <div>
    <Layout>
      <ul class="tagList">
        <li v-for="label in labels" :key="label.id">
          <router-link :to="`/labels/edit/${label.id}`" class="tag">
            <span>{{ label.name }}</span>
            <icon name="arrow" />
          </router-link>
        </li>
      </ul>
      <div class="create-tag-wrapper">
        <Button @click="add"> 新增标签 </Button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import labelListModel from "@/models/labelModel";
import Button from "@/components/Button.vue";
@Component({
  components: { Button },
})
export default class Label extends Vue {
  labels = labelListModel.data;
  add() {
    const name = prompt("请输入标签名称");
    if (name) {
      const message = labelListModel.create(name);
      if (message === "duplicated") {
        alert("标签名重复");
      } else if (message === "success") {
        alert("添加标签成功");
      }
      return;
    }
    if (name === "") alert("输入内容不能为空");
  }
}
</script>

<style lang="scss" scoped>
.tagList {
  background: #fff;
  padding-left: 16px;
  > li {
    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      color: black;
      > svg {
        margin-right: 16px;
        height: 18px;
        width: 18px;
        color: #666;
      }
    }
  }
}
.create-tag-wrapper {
  text-align: center;
  margin-top: 44px;
}
</style>