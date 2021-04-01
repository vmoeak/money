<template>
  <div>
    <Layout class-fix="label">
      <div class="content-wrapper">
        <ul class="tagList">
          <li v-for="label in labelList" :key="label.id">
            <router-link :to="`/labels/edit/${label.id}`" class="tag">
              <span>{{ label.name }}</span>
              <icon name="arrow" />
            </router-link>
          </li>
        </ul>
        <div class="create-tag-wrapper">
          <Button @click="createLabel"> 新增标签 </Button>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import createTag from "@/mixins/createTag";
import Button from "@/components/Button.vue";
@Component({
  components: { Button },
})
export default class Label extends mixins(createTag) {
  get labelList() {
    return this.$store.state.labelList;
  }
  created() {
    this.$store.commit("fetchLabelList");
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  flex-grow: 1;
  height: 0;
  .tagList {
    background: #fff;
    padding-left: 16px;
    overflow: auto;
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
  .create-tag-wrapper::after {
    content: "";
    display: block;
    height: 10px;
  }
}
::v-deep {
  .label-content {
    display: flex;
  }
}
</style>