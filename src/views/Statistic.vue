<template>
  <div>
    <Layout>
      <tab
        :value.sync="typeValue"
        class-fix="type"
        :data-source="typeList"
      ></tab>
      <tab
        :value.sync="dateValue"
        class-fix="date"
        :data-source="dateList"
      ></tab>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tab from "@/components/Tab.vue";
import { typeList, dateList } from "@/constant";
@Component({
  components: { tab },
})
export default class Statistic extends Vue {
  typeValue = "-";
  dateValue = "day";
  typeList = typeList;
  dateList = dateList;
}
</script>

<style lang="scss" scoped>
::v-deep .type-item {
  background: #fff;
  &.selected {
    background: #eee;
    &::after {
      display: none;
    }
  }
}
::v-deep .date-item {
  height: 40px;
}
</style>