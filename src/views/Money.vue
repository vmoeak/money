<template>
  <div>
    <Layout class-fix="layout">
      <tages :data-source.sync="record.tags" />
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
import { Component } from "vue-property-decorator";
type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
};
@Component({
  components: { Layout, Tages, Note, Types, NumberPad },
})
export default class Money extends Vue {
  record: Record = {
    tags: ["衣", "食", "住"],
    notes: "vmoeak",
    type: "-",
    amount: 0,
  };
}
</script>
<style lang="sass">
.layout-content
  display: flex
  flex-direction: column
</style>
<style lang="scss" scoped>
</style>