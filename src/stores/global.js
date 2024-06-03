import { App } from "ant-design-vue";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", () => {
  const message = ref();
  const notification = ref();
  const modal = ref()(() => {
    const staticFunction = App.useApp();
    message.value = staticFunction.message;
    notification.value = staticFunction.notification;
    modal.value = staticFunction.modal;
  })();
  return {
    message,
    notification,
    modal,
  };
});
