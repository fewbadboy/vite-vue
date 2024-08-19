import { defineStore } from "pinia";
import { constantRoutes, asyncRoutes } from "../router";

function hasPermission(showMenuKeys, route) {
  /**
   * 暂时以 key 作为判断
   */
  return showMenuKeys.includes(route.key);
}

export function filterAsyncRoutes(routes, showMenuKeys) {
  const resultAsyncRoutes = [];
  routes.forEach((route) => {
    const tempRoute = { ...route };
    if (hasPermission(showMenuKeys, route)) {
      if (route.children) {
        tempRoute.children = filterAsyncRoutes(
          tempRoute.children,
          showMenuKeys,
        );
      }
      resultAsyncRoutes.push(tempRoute);
    }
  });
  return resultAsyncRoutes;
}

export function filterAsyncMenus(routes, showMenuKeys) {
  const resultAsyncMenu = [];
  routes.forEach((route) => {
    const tempMenu = { ...route, component: undefined };
    if (hasPermission(showMenuKeys, route)) {
      if (route.children) {
        tempMenu.children = filterAsyncMenus(tempMenu.children, showMenuKeys);
      }
      resultAsyncMenu.push(tempMenu);
    }
  });
  return resultAsyncMenu;
}

export function filterConstantMenu(routes) {
  const resultConstantMenu = [];
  routes.forEach((route) => {
    const tempMenu = { ...route, component: undefined };
    if (!route.disabled) {
      if (route.children) {
        const hasOneMore = route.children.some((item) => !item.disabled);
        if (hasOneMore) {
          tempMenu.children = filterConstantMenu(tempMenu.children);
        } else {
          tempMenu.children = undefined;
        }
      }
      resultConstantMenu.push(tempMenu);
    }
  });
  return resultConstantMenu;
}

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    menus: [],
    selectedKeys: ["/"],
    openKeys: [],
  }),
  actions: {
    generateRoutes(menus = []) {
      return new Promise((resolve) => {
        const showMenuKeys = menus.map((item) => item.key);
        const resultAsyncRoutes = filterAsyncRoutes(asyncRoutes, showMenuKeys);
        const resultAsyncMenu = filterAsyncMenus(asyncRoutes, showMenuKeys);
        const resultConstantMenu = filterConstantMenu(constantRoutes);
        this.menus = [...resultConstantMenu, ...resultAsyncMenu];
        console.log(this.menus);
        resolve(resultAsyncRoutes);
      });
    },
  },
});
