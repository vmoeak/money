<template>
  <div>
    <Layout class-fix="layout">
      <tages :data-source="labelList" :selected-labs.sync="record.tags" />
      <note :value.sync="record.notes" />
      <types :value.sync="record.type" />
      <number-pad :value.sync="record.amount" />
    </Layout>
    {{ record }}
  </div>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Tages from "@/components/money/Tags.vue";
import Note from "@/components/money/Note.vue";
import Types from "@/components/money/Types.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import model from "@/models/recordLIstModel";
import labelListModel from "@/models/labelModel";
const records = model.fetch();
labelListModel.fetch();
@Component({
  components: { Layout, Tages, Note, Types, NumberPad },
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
</style>