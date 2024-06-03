<template>
  <div
    ref="barChartRef"
    :class="className"
    style="width: 100%; height: 400px"
  ></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref, shallowRef, watchEffect } from "vue";
import { useResize } from "@/utils/resize";

useResize(resize);

const props = defineProps({
  className: {
    type: String,
    default: "chart",
  },
  height: {
    type: String,
    default: "400px",
  },
});

const barChartRef = ref(null);
const barChart = shallowRef(null);

function initChart() {
  barChart.value = echarts.init(barChartRef.value, null, {
    height: props.height,
  });
}

watchEffect(() => {
  initChart();
  setOptions();
});

function setOptions() {
  barChart.value?.setOption({
    title: {
      text: "ECharts Getting Started Example",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  });
}

function resize() {
  barChart.value?.resize();
}
</script>

<style lang="scss" scoped></style>
