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
          <Button @click="createLabel" class="new-tag"> 新增标签 </Button>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
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
    padding: 20px 40px 20px;
    overflow: auto;
    > li {
      > .tag {
        min-height: 56px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 16px;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        margin-bottom: 10px;
        color: black;
        background: #f7f6fb;
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
    padding-top: 44px;
    .new-tag {
      background: #ff9327;
    }
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