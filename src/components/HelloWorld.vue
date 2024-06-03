<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
// 解构不破坏响应式
const { count, doubleCount } = storeToRefs(store);

import { theme, Button, DatePicker } from "ant-design-vue";

import styles from "@/styles/base.module.css";

const { useToken } = theme;
const { token } = useToken();

onMounted(() => {
  document.getElementById("btn").className = styles["btnBg"];
});

const id = ref(1);
const data = ref("");

function doAsyncWork(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`test data: ${id}`);
    }, 4000);
  });
}

watchEffect(async (onCleanup) => {
  const { response, cancel } = doAsyncWork(id.value);
  // cancel 会在 id 更改时调用以便取消之前未完成的请求
  onCleanup(cancel);
  data.value = await response;
});

defineProps({
  msg: String,
});

const value = ref("");
const count1 = ref(0);

// 订阅 action
const unsubscribe = store.$onAction(({ name, store, args, after, onError }) => {
  // 为这个特定的 action 调用提供一个共享变量
  const startTime = Date.now();
  // 这将在执行 "store "的 action 之前触发。
  console.log(`Start "${name}" with params [${args.join(", ")}].`);

  // 这将在 action 成功并完全运行后触发。
  // 它等待着任何返回的 promise
  after((result) => {
    console.log(
      `Finished "${name}" after ${
        Date.now() - startTime
      }ms.\nResult: ${result}.`,
    );
  });

  // 如果 action 抛出或返回一个拒绝的 promise，这将触发
  onError((error) => {
    console.warn(
      `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`,
    );
  });
});

onUnmounted(() => {
  // 删除监听器
  unsubscribe();
});
</script>

<template>
  <h1>{{ msg }}</h1>

  <a-date-picker :locale="zhCN" v-model:value="value" />
  <a-button type="danger" :style="{ backgroundColor: token.colorPrimary }"
    >危险</a-button
  >
  <a-button type="primary" loading>Loading</a-button>
  <div class="card">
    <button type="button" class="bg-rose-300" @click="count++">
      count is {{ count }}
    </button>
    <p>
      <span class="text-blue-500 underline">Edit</span>
      <code class="text-rose-500">components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <button id="btn">Button</button>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
