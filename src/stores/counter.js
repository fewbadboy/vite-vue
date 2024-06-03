import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
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
    // 支持异步
    increment() {
      this.count++;
    },
  },

  // const count = ref(0)

  // const doubleCount = computed(() => count.value * 2)

  // function increment() {
  //   count.value++
  // }

  // return { count, doubleCount, increment }
});
