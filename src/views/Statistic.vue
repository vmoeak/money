<template>
  <div>
    <Layout>
      <tab
        :value.sync="typeValue"
        class-fix="type"
        :data-source="typeList"
      ></tab>
      <!-- <tab
        :value.sync="dateValue"
        class-fix="date"
        :data-source="dateList"
      ></tab> -->
      <ul>
        <li class="record" v-for="record in groupedList" :key="record.title">
          <div class="record-title">
            <span>{{ beautifyTitle(record.title) }}</span>
            <span>{{ "￥" + total(record.items) }}</span>
          </div>
          <ul>
            <li
              class="record-item"
              v-for="recordItem in record.items"
              :key="recordItem.id"
            >
              <span v-for="tag in recordItem.tags" :key="tag.id" class="tag">{{
                tag.name
              }}</span>
              <span class="note">{{ recordItem.notes }}</span>
              <span>{{ "￥" + recordItem.amount }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <echart></echart>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tab from "@/components/Tab.vue";
import { typeList, dateList } from "@/constant";
import dayjs from "dayjs";
import { clone } from "@/util";
import Echart from "@/components/Echart.vue";
@Component({
  components: { Tab, Echart },
})
export default class Statistic extends Vue {
  typeValue = "-";
  dateValue = "day";
  typeList = typeList;
  dateList = dateList;
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }
  get groupedList() {
    if (!this.recordList || this.recordList.length === 0) return [];
    const hashTable: { title: string; items: RecordItem[] }[] = [];
    const recordList = clone(this.recordList) as RecordItem[];
    const filterList = recordList.filter(
      (item) => item.type === this.typeValue
    );
    if (filterList.length === 0) {
      return;
    }
    const sortedList = filterList.sort(
      (a, b) => dayjs(b.time).valueOf() - dayjs(a.time).valueOf()
    );
    if (sortedList.length === 0) return [];
    hashTable.push({
      title: sortedList[0].time!,
      items: [sortedList[0]],
    });
    for (let i = 1; i < sortedList.length; i++) {
      if (
        dayjs(hashTable[hashTable.length - 1].title).isSame(
          dayjs(sortedList[i].time),
          "day"
        )
      ) {
        hashTable[hashTable.length - 1].items.push(sortedList[i]);
      } else {
        hashTable.push({
          title: sortedList[i].time!,
          items: [sortedList[i]],
        });
      }
    }
    return hashTable;
  }
  created() {
    this.$store.commit("fetchRecordList");
  }
  beautifyTitle(title: string) {
    const now = dayjs(new Date());
    const recordDate = dayjs(title);
    if (recordDate.isSame(now, "day")) return "今天";
    else if (recordDate.isSame(now.subtract(1, "day"), "day")) return "昨天";
    else if (recordDate.isSame(now.subtract(2, "day"), "day")) return "前天";
    else if (recordDate.isSame(now, "year")) return recordDate.format("M月D日");
    else return recordDate.format("YYYY年MM月DD日");
  }
  total(recordList: RecordItem[]) {
    if (recordList.length === 0) return "";
    return recordList.reduce((sum, item) => sum + item.amount, 0);
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-item {
    background: #fff;
    &.selected {
      background: #eee;
      &::after {
        display: none;
      }
    }
  }
  .date-item {
    height: 40px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
}
.record {
  &-title {
    @extend %item;
  }
  &-item {
    background: #fff;
    @extend %item;
    > .tag {
      margin-left: 8px;
    }
    > .note {
      margin-right: auto;
      margin-left: 8px;
    }
  }
}
</style>