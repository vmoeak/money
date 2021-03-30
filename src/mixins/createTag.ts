import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class CreateTag extends Vue {
  createLabel() {
    const name = prompt("请输入标签名称");
    if (name) {
      this.$store.commit("createLabel", name);
      return;
    }
    if (name === "") alert("输入内容不能为空");
  }
}
