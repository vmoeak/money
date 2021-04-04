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
      <a-date-picker
        :mode="pickerType"
        :format="format"
        :value="selectedDate"
        :open="isOpen"
        placeholder="请选择日期"
        @focus="showPannel"
        @panelChange="closePannel"
        @change="closePannel"
        @openChange="handleOpenChange"
      >
      </a-date-picker>
      <echart :echarts-data="echartsPieData"></echart>
      <echart
        v-if="dateValue === 'day' ? false : true"
        :echarts-data="echartsLineData"
      ></echart>
      <ul>
        <li class="record" v-for="record in resultList" :key="record.title">
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
              <span>{{ recordItem.tag.name }}</span>
              <span class="note">{{ recordItem.notes }}</span>
              <span>{{ "￥" + recordItem.amount }}</span>
            </li>
          </ul>
        </li>
      </ul>
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
import { EChartsOption } from "echarts";
@Component({
  components: { Tab, Echart },
})
export default class Statistic extends Vue {
  typeValue = "-";
  dateValue = "day";
  isOpen = false;
  format = "YYYY-MM-DD";
  selectedDate = dayjs(new Date());
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
      return [];
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
  get resultList() {
    if (this.groupedList.length === 0) return [];
    if (this.dateValue === "day") {
      return this.groupedList.filter((item) => {
        return dayjs(item.title).isSame(dayjs(this.selectedDate), "day");
      });
    }
    if (this.dateValue === "month") {
      return this.groupedList.filter((item) => {
        return dayjs(item.title).isSame(dayjs(this.selectedDate), "month");
      });
    }
    if (this.dateValue === "year") {
      return this.groupedList.filter((item) => {
        return dayjs(item.title).isSame(dayjs(this.selectedDate), "year");
      });
    }
    return [];
  }
  get pickerType() {
    const { selectedDate } = this;
    switch (this.dateValue) {
      case "day":
        this.format = "YYYY-MM-DD";
        return "date";
      case "month":
        this.format = "YYYY-MM";
        return "month";
      case "year":
        this.format = "YYYY";
        return "year";
    }
    return;
  }
  get echartsLineData() {
    if (this.dateValue === "day") return {};
    if (this.resultList.length === 0) return {};
    type dataSource = {
      data: string[];
      amount: string[];
    };
    const list: dataSource = { data: [], amount: [] };
    if (this.dateValue === "month") {
      const days = dayjs(this.resultList[0].title).daysInMonth();
      let j = 0;
      let length = this.resultList.length;
      for (let i = days; i >= 1; i--) {
        list.data.unshift(i + "日");
        if (
          j < length &&
          dayjs(this.resultList[j].title).format("D") === i.toString()
        ) {
          list.amount.unshift(this.total(this.resultList[j].items));
          j++;
        } else {
          list.amount.unshift("0");
        }
      }
    } else {
      let length = this.resultList.length;
      let j = 0;
      for (let i = 12; i >= 1; i--) {
        list.data.unshift(i + "月");
        let sum = 0;
        while (
          j < length &&
          dayjs(this.resultList[j].title).format("M") === i.toString()
        ) {
          sum += parseFloat(this.total(this.resultList[j].items));
          j++;
        }
        list.amount.unshift(sum.toString());
      }
    }
    return {
      // title: {
      //   text: "ECharts Getting Started Example",
      // },
      grid: {
        top: 100,
        left: 5,
        right: 5,
      },
      tooltip: {
        show: true,
        trigger: "item",
        backgroundColor: "#007fff",
        className: "toolTip-costum",
        borderColor: "transparent",
        padding: 0,
        position: function (params) {
          return [params[0] - 40, params[1] - 68];
        },
        formatter: function (params: any) {
          var name1 = params.name;
          var str = `
        <div style="position: relative">
           <div class='tooltip-title' style="padding:0 30px;text-align: center; font-size: 8px">
            <span>${params.name}</span>
          </div>
          <div class="tooltip-amount" style="text-align: center; font-size: 12px">
            <span>￥${params.data}</span>
          </div>
          <div style="border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #007fff;position: absolute; left: 50%; bottom: -9px; transform: translateX(-50%); filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, .2));"></div>
        </div>
      `;
          return str;
        },
      },
      xAxis: {
        type: "category",
        data: list.data,
        axisTick: { alignWithLabel: true, show: false },
        axisLabel: {
          // 强制显示x轴最后一个数据
          showMaxLabel: true,
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          name: "moneyseries",
          symbolSize: 5,
          type: "line",
          data: list.amount,
        },
      ],
    } as EChartsOption;
  }
  get echartsPieData() {
    const list: { [key: string]: number } = {};
    this.resultList.forEach((record) => {
      record.items.forEach((item) => {
        if (list[item.tag.name]) list[item.tag.name] += item.amount;
        else {
          list[item.tag.name] = item.amount;
        }
      });
    });
    const soureData: { value: number; name: string }[] = [];
    for (let key in list) {
      soureData.push({ name: key, value: list[key] });
    }
    console.log("sourdata", soureData);
    console.log(list, "list12345565666777");
    return {
      grid: {
        top: 100,
        left: 5,
        right: 5,
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "分类",
          type: "pie",
          radius: "50%",
          data: soureData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    } as EChartsOption;
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
    return recordList.reduce((sum, item) => sum + item.amount, 0).toString();
  }
  showPannel() {
    this.isOpen = true;
  }
  closePannel(value: any) {
    this.selectedDate = value;
    this.isOpen = false;
  }
  handleOpenChange(open: any) {
    this.isOpen = false;
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  ul {
    margin-bottom: 0;
  }
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