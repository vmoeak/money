<template>
  <div class="echart-wraper">
    <div ref="myChart" class="echart"></div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import * as echarts from "echarts/core";
import { EChartsOption } from "echarts";
import {
  PieChart,
  // The series types are defined with the SeriesOption suffix
  PieSeriesOption,
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
  PieChart,
  CanvasRenderer,
  LineChart,
  TooltipComponent,
]);
@Component
export default class Echart extends Vue {
  @Prop() readonly echartsData!: EChartsOption;
  myChart: any;
  mounted() {
    this.myChart = echarts.init(this.$refs.myChart as HTMLElement);
    this.myChart.setOption(this.echartsData);
  }
  @Watch("echartsData")
  onOptionChange(newValue: EChartsOption) {
    this.myChart.setOption(newValue);
  }
}
</script>

<style lang="scss" scoped>
// echart 加载时容器要初始化宽高
.echart-wraper {
  overflow: auto;
  .echart {
    height: 260px;
  }
}
</style>