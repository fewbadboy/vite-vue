import { h } from "vue";
import { DesktopOutlined } from "@ant-design/icons-vue";

const menus = [
  {
    key: "/components",
    icon: () => h(DesktopOutlined),
    label: "components",
    title: "components",
    path: "/components",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        key: "table",
        label: "table",
        title: "table",
        path: "table",
        component: () => import("@/components/table/ComplexTable.vue"),
      },
      {
        key: "charts",
        label: "charts",
        title: "charts",
        path: "charts",
        component: () => import("@/components/charts/index.vue"),
        children: [
          {
            key: "bar-chart",
            label: "bar-chart",
            title: "bar-chart",
            path: "bar-chart",
            component: () => import("@/components/charts/BarView.vue"),
          },
          {
            key: "network-chart",
            label: "network-chart",
            title: "network-chart",
            path: "network-chart",
            component: () => import("@/components/charts/NetworkChart.vue"),
          },
          {
            key: "timeline-chart",
            label: "timeline-chart",
            title: "timeline-chart",
            path: "timeline-chart",
            component: () => import("@/components/charts/TimeLine.vue"),
          },
        ],
      },
      {
        key: "nav13",
        label: "nav13",
        title: "nav13",
        path: "nav13",
        component: () => import("@/components/VueRouter.vue"),
      },
    ],
  },
];

export default menus;
