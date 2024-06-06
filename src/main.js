import { createApp, version } from "vue";
import { createPinia } from "pinia";

import router from "./router";

import "ant-design-vue/dist/reset.css";
import "./styles/tailwind.demo.scss";

import App from "./App.vue";

const pinia = createPinia();

import "./permission";

const app = createApp(App);
app.use(pinia).use(router).mount("#app");

app.config.errorHandler = (error, instance, info) => {
  // todo: 应用内部全局错误处理
  console.error(error);
};

console.log(`Vue Version:%c ${version}`, "color: green");
