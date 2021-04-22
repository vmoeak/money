<template>
  <div>
    <layout>
      <div class="navbar">
        <icon name="right" @click="goBack" />
        <span>编辑标签</span>
      </div>
      <div class="input-wrapper">
        <input-form
          labelName="标签名"
          placeHolder="请输入标签名"
          :value="label && label.name"
          @update:value="updateInput"
        ></input-form>
      </div>
      <div class="button-wrapper">
        <Button @click="updateLabel" class="save-edit">保存修改</Button>
        <Button @click="remove">删除标签</Button>
      </div>
    </layout>
  </div>
</template>

<script lang='ts'>
import Layout from "@/components/Layout.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import InputForm from "@/components/InputForm.vue";
import Button from "@/components/Button.vue";
@Component({
  components: { InputForm, Button, Layout },
})
export default class EditLabel extends Vue {
  get label() {
    return this.$store.state.currentTag;
  }
  tagName = "";
  created() {
    this.$store.commit("fetchLabelList");
    const id = this.$route.params.id;
    this.$store.commit("findTag", id);
    if (!this.label) this.$router.replace("/404");
    this.tagName = this.label.name;
  }
  updateInput(name: string) {
    this.tagName = name;
  }
  updateLabel() {
    if (!this.label) return;
    if (!this.tagName) {
      alert("请输入标签名");
      return;
    }
    this.$store.commit("updateLabel", {
      name: this.tagName,
      id: this.label.id,
    });
  }
  remove() {
    if (this.label) {
      this.$store.commit("removeLabel", this.label.id);
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  text-align: center;
  padding: 20px 0;
  background: #fff;
  border-bottom: 1px solid #eee;
  margin: 0 10px;
  > svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
  }
}
.input-wrapper {
  background: #f3eeeb;
  margin: 24px 20px 0;
  border-radius: 5px;
}
.button-wrapper {
  Button {
    background: #ff9327;
  }
  .save-edit {
    margin-right: 30px;
  }
  text-align: center;
  margin-top: 44px;
}
</style> 