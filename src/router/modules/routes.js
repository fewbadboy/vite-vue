const routes = [
  {
    path: "/cat/:customName?",
    name: "cat",
    props: true,
    component: () => import("@/components/CatList.vue"),
  },
  {
    path: "/dog",
    name: "dog",
    component: () => import("@/components/DogList.vue"),
    children: [
      {
        path: "dog-sub",
        name: "dog-sub",
        component: () => import("@/components/DogSub.vue"),
        // children: [
        //   {
        //     path: 'dog-sub-sub',
        //     name: 'dog-sub-sub',
        //     component: () => import('@/components/DogSubSub.vue')
        //   }
        // ]
      },
    ],
  },
  {
    // 仅匹配可选的数字
    path: "/test/:type/:id(\\d+)?/",
    name: "dynamic",
    component: () => import("@/components/VueRouter.vue"),
  },
  {
    /**
     * 匹配 /maths /maths/ /maths/1 等
     */
    path: "/maths/:id(\\d+)+",
    name: "maths-parent",
    component: () => import("@/components/VueRouter.vue"),
    children: [
      {
        /**
         * /maths/:id(\\d+)* 匹配成功时，组件渲染到 <router-view> 内部
         */
        path: "",
        name: "maths",
        component: () => import("@/components/VueRouter.vue"),
      },
    ],
  },
];

export default routes;
