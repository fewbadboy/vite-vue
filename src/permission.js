import router from "./router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { usePermissionStore } from "@/stores/permission";

const whileList = ["/sign-in", "/sign-up"];

async function canAccessPage(to) {
  const auth = useAuthStore();
  const user = useUserStore();
  const permission = usePermissionStore();
  const { authorization, isAuthenticated } = storeToRefs(auth);
  const { menus } = storeToRefs(user);
  const { getUserInfo } = user;
  const { generateRoutes } = permission;

  return new Promise(async (resolve, reject) => {
    if (isAuthenticated.value) {
      if (to.path === "/sign-in") {
        resolve({ path: "/" });
      } else {
        const hasMenus = menus.length > 0;
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

    // if (!whileList.includes(to.path) && !isAuthenticated.value) {
    //   resolve({ name: 'sign-in' })
    // } else {
    //   if (whileList.includes(to.path) && isAuthenticated.value) {
    //     resolve({ path: '/' })
    //   } else {
    //     resolve(true)
    //   }
    // }
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
