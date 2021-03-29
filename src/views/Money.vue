<template>
  <div>
    <Layout class-fix="layout">
      <tages :data-source="labelList" :selected-labs.sync="record.tags" />
      <div class="input-wrapper">
        <input-form
          :value.sync="record.notes"
          label-name="备注"
          place-holder="请输入备注"
        />
      </div>
      <types :value.sync="record.type" />
      <number-pad :value.sync="record.amount" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Tages from "@/components/money/Tags.vue";
import InputForm from "@/components/InputForm.vue";
import Types from "@/components/money/Types.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import model from "@/models/recordLIstModel";
import labelListModel from "@/models/labelModel";
const records = model.fetch();
labelListModel.fetch();
@Component({
  components: { Layout, Tages, InputForm, Types, NumberPad },
})
export default class Money extends Vue {
  labelList = labelListModel.data;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  @Watch("record.amount")
  onSubmit() {
    this.record.time = new Date();
    records.push(model.clone(this.record));
    model.save(records);
  }
}
</script>
<style lang="sass">
.layout-content
  display: flex
  flex-direction: column
</style>
<style lang="scss" scoped>
.input-wrapper {
  padding: 12px 0;
}
</style>