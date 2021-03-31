<template>
  <div>
    <Layout class-fix="layout">
      <tages :selected-labs.sync="record.tags" />
      <div class="input-wrapper">
        <input-form
          :value.sync="record.notes"
          label-name="备注"
          place-holder="请输入备注"
        />
      </div>
      <tab :value.sync="record.type" class-fix="type" :data-source="typeList" />
      <number-pad :value.sync="record.amount" />
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
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  typeList = typeList;
  created() {
    this.$store.commit("fetchRecordList");
  }
  @Watch("record.amount")
  onSubmit() {
    this.$store.commit("createRecord", this.record);
    this.$store.commit("saveRecordList");
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