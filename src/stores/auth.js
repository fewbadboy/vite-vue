import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authorization: "",
  }),
  getters: {
    isAuthenticated: (state) => state.authorization.startsWith("Bear"),
  },
  actions: {
    // 支持异步
    async setAuthorization() {
      try {
        this.authorization = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("Bear 1234567");
          }, 2000);
        });
      } catch (error) {
        return error;
      }
    },
  },
});
