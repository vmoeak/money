<template>
  <div>
    <Layout>
      <ul class="tagList">
        <li v-for="label in labelList" :key="label.id">
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
import Button from "@/components/Button.vue";
@Component({
  components: { Button },
  computed: {
    labelList() {
      return this.$store.state.labelList;
    },
  },
})
export default class Label extends Vue {
  created() {
    this.$store.commit("fetchLabelList");
  }
  add() {
    const name = prompt("请输入标签名称");
    if (name) {
      this.$store.commit("createLabel", name);
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