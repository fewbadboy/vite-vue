import router from "./router";
import { storeToRefs } from "pinia";

import { useUserStore } from "@/stores/user";
import { usePermissionStore } from "@/stores/permission";
import { getToken } from "./utils/auth";

const whileList = ["/sign-in", "/sign-up"];

async function canAccessPage(to) {
  const user = useUserStore();
  const permission = usePermissionStore();
  const { menus } = storeToRefs(user);
  const { getUserInfo } = user;
  const { generateRoutes } = permission;

  return new Promise(async (resolve, reject) => {
    const token = getToken();
    if (token) {
      if (to.path === "/sign-in") {
        resolve({ path: "/" });
      } else {
        console.log(menus);
        const hasMenus = menus.length > 0;
        console.log(to, hasMenus);
        if (hasMenus) {
          resolve(true);
        } else {
          // await getUserInfo()
          const menus1 = [
            { key: "/" },
            { key: "/components" },
            { key: "table" },
            { key: "charts" },
            { key: "bar-chart" },
            { key: "network-chart" },
            { key: "timeline-chart" },
            { key: "nav13" },
          ];
          const accessRoutes = await generateRoutes(menus1);
          accessRoutes.forEach((route) => {
            router.addRoute(route);
          });
          resolve(true);
        }
      }
    } else {
      // 未认证
      if (!whileList.includes(to.path)) {
        resolve({ path: "/sign-in" });
      } else {
        resolve(true);
      }
    }
  });
}

// https://github.com/vuejs/rfcs/blob/master/active-rfcs/0037-router-return-guards.md
router.beforeEach(async (to, from) => {
  return await canAccessPage(to);
});

//
router.afterEach((to, from, failure) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transition = toDepth < fromDepth ? "slide-right" : "slide-left";

  if (failure) {
    // todo: 导航故障
  }
});

router.onError(() => {
  console.log();
});
