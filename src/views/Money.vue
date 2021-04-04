<template>
  <div>
    <Layout class-fix="layout">
      <tab :value.sync="record.type" class-fix="type" :data-source="typeList" />
      <tages :seleted-tag.sync="record.tag" />
      <div class="input-wrapper">
        <input-form
          :value.sync="record.notes"
          label-name="备注"
          place-holder="请输入备注"
        />
      </div>
      <number-pad :value.sync="record.amount" @submit="onSubmit" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Tages from "@/components/money/Tags.vue";
import InputForm from "@/components/InputForm.vue";
import Tab from "@/components/Tab.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { typeList } from "@/constant";
@Component({
  components: { Layout, Tages, InputForm, Tab, NumberPad },
})
export default class Money extends Vue {
  record: RecordItem = {
    tag: { name: "", id: "" },
    notes: "",
    type: "-",
    amount: 0,
  };
  typeList = typeList;
  created() {
    this.$store.commit("fetchRecordList");
  }
  onSubmit() {
    if (!this.record.tag.name) return alert("请选择标签");
    if (!this.record.amount) return alert("请输入金额");
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.isSuccessCreate) {
      alert("记录成功");
      this.record.amount = 0;
      this.record.tag = { name: "", id: "" };
      this.record.notes = "";
      (this as any).$eventBus.$emit("saveSucced");
    } else alert("保存失败");
  }
}
</script>
<style lang="scss" scoped>
.input-wrapper {
  padding: 12px 0;
}
::v-deep {
  .layout-content {
    display: flex;
    flex-direction: column;
  }
}
</style>