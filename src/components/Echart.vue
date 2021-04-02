<template>
  <div class="echart-wraper">
    <div ref="myChart" class="echart"></div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as echarts from "echarts/core";
import { EChartsOption } from "echarts";
import {
  BarChart,
  // The series types are defined with the SeriesOption suffix
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from "echarts/charts";
import {
  TitleComponent,
  // The component types are defined with the suffix ComponentOption
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

// Combine an Option type with only required components and charts via ComposeOption
echarts.use([
  TitleComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LineChart,
  TooltipComponent,
]);
var option: EChartsOption = {
  title: {
    text: "ECharts Getting Started Example",
  },
  grid: {
    top: 10,
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
    data: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    axisTick: { alignWithLabel: true, show: false },
    axisLabel: {
      interval: 1,
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
      data: [5, 20, 36, 10, 10, 20, 0, 0, 0, 0, 0, 0],
    },
  ],
};

@Component
export default class Echart extends Vue {
  option = option;
  mounted() {
    var myChart = echarts.init(this.$refs.myChart as HTMLElement);
    myChart.setOption(this.option);
  }
}
</script>

<style lang="scss" scoped>
// echart 加载时容器要初始化宽高
.echart-wraper {
  overflow: auto;
  .echart {
    height: 400px;
  }
}
</style>