import { h } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { base } from "@/settings";
import menus from "./modules/menus";
import { DesktopOutlined } from "@ant-design/icons-vue";

/**
 * path
 * name
 * redirect
 * component
 *
 *
 * key                                权限标记 | 导航标记
 * icon: () => h() | undefined
 * label
 * title                              收缩显示
 * type: group | divider | undefined
 * disabled: true | false             true 菜单栏隐藏
 * meta: {
 *      transition: ''                过度动画
 * }
 * children: []
 */

export const constantRoutes = [
  {
    path: "/sign-in",
    name: "sign-in",
    disabled: true,
    component: () => import("@/components/WhiteList/SignIn.vue"),
  },
  {
    path: "/sign-up",
    name: "sign-up",
    disabled: true,
    component: () => import("@/components/WhiteList/SignUp.vue"),
  },
  {
    path: "/",
    key: "/",
    label: "dashboard",
    title: "dashboard",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        disabled: true,
        component: () => import("@/components/dashboard/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error-page",
    disabled: true,
    component: () => import("@/components/error-pages/404.vue"),
  },
];

export const asyncRoutes = [...menus];

const router = createRouter({
  history: createWebHistory(base),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0,
        behavior: "smooth",
      };
    }
  },
});

// router.hasRoute()
// router.getRoutes()

// 动态添加子路由
// router.addRoute('dog-sub', {
//   path: 'dog-sub-sub',
//   name: 'dog-sub-sub',
//   component: () => import('@/components/DogSubSub.vue')
// })

// router.removeRoute('dog-sub')

// 动态添加一个匹配正则路由时，改变当前的位置，并覆盖我们原来的位置
// await router.replace(router.currentRoute.value.fullPath)

/**
 * 1. 添加路由
 * { path: '/about/:name', component: () => import('') }
 * 动态加入一个 路径是 /about/17 的路由时，需要
 * route = useRoute() （在 setup 中）
 * await router.replace(route.fullPath) 等待新的路由显示
 *
 * 2. 导航守卫中动态添加
 * hasNecessaryRoute(to) 在添加新的路由后返回 false 避免无限重定向
 * 返回新位置触发重定向 to.fullPath
 */

export default router;
