<template>
  <div ref="networkRef" style="height: 400px"></div>
</template>

<script setup>
import "vis-network/styles/vis-network.min.css";

import { onMounted, reactive, ref, shallowRef, unref, watchEffect } from "vue";
import { DataSet, DataView } from "vis-data";
import { Network } from "vis-network";
import { useResize } from "@/utils/resize";

useResize(redraw);

const networkRef = ref(null);

/**
 * moveTo({
 *  position,
 *  scale,
 *  offset,
 *  animation: { duration, easingFunction }
 * })
 *
 * cluster() 缩放集合
 */
const network = shallowRef(null);

const nodes = new DataSet();
const edges = new DataSet();

// nodes.update({id,label,value})/remove({id})
nodes.add([
  {
    id: 1,
    label: "Node 1\n",
    // box,circle,diamond,dot,ellipse,star,triangle,triangleDown
    // circularImage (image: xx.png)
    shape: "star",
    value: 1,
    color: "orange",
    title: "a popup",
  },
  { id: 2, label: "Node 2", value: 1 },
  { id: 3, label: "Node 3", value: 2, color: "green" },
  { id: 4, label: "Node 4", value: 30 },
  { id: 5, label: "Node 5", value: 1 },
]);

edges.add([
  {
    from: 1,
    to: 3,
    value: 1,
    label: "1-3",
    dashes: true, // [2, 2, 10, 10]
    color: {
      /**
       * 继承 3 节点颜色
       * to from both
       */
      inherit: "to",
      opacity: 1,
      highlight: "blue",
    },
    arrows: {
      // 'to, middle, from'
      from: { enabled: true, scaleFactor: 0 },
      middle: { enabled: true, scaleFactor: 1 },
      to: {
        enabled: true,
        scaleFactor: 1,
        /**
         * image
         * imageWidth/imageHeight/src
         */
        type: "diamond",
      },
    },
    endPointOffset: {
      from: 0,
      to: -10,
    },
  },
  { from: 1, to: 2, value: 1 },
  { from: 2, to: 4, value: 3 },
  { from: 2, to: 5, value: 1 },
  { from: 3, to: 3, value: 1 },
]);

function handleFilterNodes(bode) {
  // todo: 过滤条件为 true 的节点
  return true;
}

/**
 * nodesView.refresh() 触发 filter
 */
const nodesView = new DataView(nodes, { filter: handleFilterNodes });

const data = reactive({
  nodes: nodesView,
  edges: edges,
});

/**
 * 虽然是可选，必须传 不然会报错
 */
const options = ref({
  nodes: {
    shape: "box",
    margin: {},
    scaling: {
      label: {},
      customScalingFunction: function (min, max, total, value) {
        return value / total;
      },
      min: 2,
      max: 10,
    },
    shapeProperties: { borderDashes: [] },
  },
  edges: {
    shadow: true,
    /**
     * type: dynamic/continuous/cubicBezier
     */
    smooth: true,
    font: {
      align: "top",
      background: "#2ff",
      strokeWidth: 0,
      strokeColor: "",
    },
    background: {
      size: 6,
      enabled: true,
      color: "#2ff",
    },
  },
  layout: {
    randomSeed: 2,
    // hierarchical: {
    //   direction: 'RL',
    //   sortMethod: "directed"
    // }
  },
  interaction: {
    hover: true,
    navigationButtons: true,
    keyboard: true,
  },
  manipulation: {
    enabled: true,
    addNode: (data, callback) => {},
    editNode: (data, callback) => {},
    addEdge: (data, callback) => {},
  },
  physics: {
    enabled: true,
  },
  /**
   * 分组
   */
  groups: {
    internet: {
      shape: "square",
      color: "#109618", // green
    },
  },
});

onMounted(() => {
  let x = -networkRef.value?.clientWidth / 2 + 10 - 200;
  let y = -networkRef.value?.clientHeight / 2 + 10;
  nodes.add([
    {
      id: 1000,
      x,
      y,
      label: "Internet",
      group: "internet",
      value: 1,
      fixed: true,
      physics: false,
    },
  ]);
  network.value = new Network(networkRef.value);
  /**
   * showPopup/hidePopup
   * select/selectNode/selectEdge/deselectNode/deselectEdge
   * hoverNode/hoverEdge
   * blurNode/blurEdge
   */
  network.value.on("click", function (params) {
    console.log(params);
  });
});

watchEffect(() => {
  /**
   * 解析 DOT Language
   * data = parseDOTNetwork(dot)
   */
  //
  network.value?.setData(data);
  network.value?.setOptions(options.value);
  network.value?.setSize("100%", "500px");
});

function redraw() {
  // todo
  console.log(networkRef.value);
  // network.value?.setSize(networkRef.value?.clientWidth, '500px')
  // network.value?.fit()
}
</script>

<style lang="scss" scoped></style>
