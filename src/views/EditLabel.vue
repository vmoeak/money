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
          @update:value="update"
        ></input-form>
      </div>
      <div class="button-wrapper">
        <Button @click="remove">删除标签</Button>
      </div>
    </layout>
  </div>
</template>

<script lang='ts'>
import Layout from "@/components/Layout.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import labelModel from "@/models/labelModel";
import InputForm from "@/components/InputForm.vue";
import Button from "@/components/Button.vue";
labelModel.fetch();
@Component({
  components: { InputForm, Button, Layout },
})
export default class EditLabel extends Vue {
  get label() {
    return this.$store.state.currentTag;
  }
  created() {
    this.$store.commit("fetchLabelList");
    const id = this.$route.params.id;
    this.$store.commit("findTag", id);
    if (!this.label) this.$router.replace("/404");
  }
  update(name: string) {
    if (!this.label || !name) return;
    this.$store.commit("updateLabel", { name, id: this.label.id });
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
  padding: 12px 0;
  background: #fff;
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
  background: #fff;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  margin-top: 44px;
}
</style>