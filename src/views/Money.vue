<template>
  <div>
    <Layout class-fix="layout">
      <tages :seleted-tag.sync="record.tag" />
      <div class="date-picker-wrapper">
        <a-date-picker
          v-model="record.time"
          placeholder="请选择日期"
        ></a-date-picker>
      </div>
      <div class="input-wrapper">
        <input-form
          :value.sync="record.notes"
          label-name="备注"
          place-holder="请输入备注"
        />
      </div>
      <tab :value.sync="record.type" class-fix="type" :data-source="typeList" />
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
import dayjs from "dayjs";
@Component({
  components: { Layout, Tages, InputForm, Tab, NumberPad },
})
export default class Money extends Vue {
  record: RecordItem = {
    tag: { name: "", id: "" },
    notes: "",
    type: "-",
    amount: 0,
    time: dayjs(new Date()),
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
  border: 1px solid #edeae4;
  margin: 10px 20px 0;
  border-radius: 5px;
}
::v-deep {
  .layout-content {
    display: flex;
    flex-direction: column;
  }
}
.date-picker-wrapper {
  padding: 0 20px;
  ::v-deep {
    span {
      display: block;
    }
    input {
      box-sizing: border-box;
      width: 100%;
      border: 0;
      margin: 0;
      padding: 10px 0;
      padding-left: 16px;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 5px;
    }
  }
}
</style>