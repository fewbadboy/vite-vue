<script setup>
import { computed, onMounted, ref } from "vue";
import { StyleProvider, ConfigProvider } from "ant-design-vue";
import Layout from "@/layout/index.vue";

import zhCN from "ant-design-vue/es/locale/zh_CN";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const theme = ref({
  components: {
    Radio: {
      colorPrimary: "#00b96b",
    },
  },
});

const locale = computed(() => {
  return zhCN;
});

onMounted(() => {
  document.documentElement.classList.add("dark");
});
</script>

<template>
  <ConfigProvider :theme="theme" :locale="locale">
    <StyleProvider hash-priority="high">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'">
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </StyleProvider>
  </ConfigProvider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cff);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883);
}
</style>
