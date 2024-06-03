<template>
  <div ref="timelineRef"></div>
</template>

<script setup>
import "vis-timeline/styles/vis-timeline-graph2d.min.css";

import { onMounted, reactive, ref, shallowRef, watchEffect } from "vue";
import { DataSet } from "vis-data";
import { Timeline } from "vis-timeline";

const timelineRef = ref(null);
/**
 * setWindow()
 * setSelection()
 * moveTo()
 * fit()
 *
 * addCustomTime/setCustomTimeMarker
 */
const timeline = shallowRef(null);

const groups = new DataSet([
  { id: 1, content: "Group 1", value: 2, visible: true },
  {
    id: 2,
    content: "Group 2",
    value: 1,
    nestedGroups: [],
  },
]);

/**
 * clear()
 * add()
 * update()
 */
const items = new DataSet([
  {
    // 添加区域背景
    id: "A",
    content: "Period A",
    start: "2014-04-10",
    end: "2014-04-20",
    type: "background",
    group: 1,
    className: "",
  },
  { id: 1, content: "item 1", start: "2014-04-20", group: 1 },
  { id: 2, content: "item 2", start: "2014-04-14", group: 1 },
  {
    id: 3,
    content: "item 3",
    start: "2014-04-18",
    group: 2,
    title: "item 3 tooltip", // tooltip
    editable: {
      add: true,
      remove: true,
      updateTime: true,
      updateGroup: true,
    },
  },
  {
    id: 4,
    content: "item 4",
    start: "2014-04-16",
    end: "2014-04-19",
    group: 1,
  },
  { id: 5, content: "item 5", start: "2014-04-25" },
  { id: 6, content: "item 6", start: "2014-04-27", type: "point", group: 1 },
]);

const options = ref({
  hiddenDates: [],
  // start: new Date(2014,4,1),
  // end: ,
  min: new Date(2014, 4, 1),
  max: new Date(2014, 4, 30),
  // rollingMode: {
  //   follow: true,
  //   offset: 0.5,
  // },
  // tooltip: {
  //   template: (originalItemData, parsedItemData) => {}
  // },
  editable: true,
  multiselect: true,
  groupOrder: function (a, b) {
    return a.value - b.value;
  },
  onAdd: function (item, callback) {
    callback(item);
  },
  onUpdate: function (item, callback) {
    callback(item);
  },
  onRemove: function (item, callback) {
    callback(item);
  },
});

onMounted(() => {
  timeline.value = new Timeline(timelineRef.value);
});

watchEffect(() => {
  timeline.value?.setItems(items);
  timeline.value?.setGroups(groups);
  timeline.value?.setOptions(options.value);
  // timeline.value?.setSize('100%', '500px')
});
</script>

<style lang="scss" scoped></style>
