import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { signIn, getUserInfo, signOut } from "@/api/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    avatar: "",
    menus: [],
    users: [],
  }),
  getters: {
    double: (state) => state.count * 2,
    doublePlusOne: () => {
      return this.double + 1;
    },
    // 传递参数
    getUserById: (state) => {
      // 访问其他的 userOtherStore()
      return (userId) => state.users.find((user) => user.id === userId);
    },
  },
  actions: {
    async signIn({ username, password }) {
      const auth = useAuthStore();
      return await signIn({ username, password }).then(
        ({ data: { token_type, access_token } }) => {
          auth.authorization = `${token_type} ${access_token}`;
        },
      );
    },
    getUserInfo() {
      return getUserInfo().then(({ data: { name, avatar, menus } }) => {
        this.name = name;
        this.avatar = avatar;
        this.menus = menus;
      });
    },
    signOut() {
      signOut().then(() => {
        // todo
      });
    },
  },
});
