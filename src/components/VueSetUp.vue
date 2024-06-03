<script setup>
import { ref, useAttrs } from "vue";

const asyncData = await new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: "sleep 4s",
    });
  }, 4000);
});

defineOptions({
  inheritAttrs: false,
  customOptions: {},
});

const props = defineProps({
  foo: {
    type: String,
    default: "",
  },
  push: {
    type: String,
    default: "success",
    validator(value, props) {
      return ["success", "warning", "danger"].includes(value);
    },
  },
});

const emit = defineEmits({
  // 验证
  commit: ({ name, password }) => {
    if (name && password) {
      return true;
    } else {
      return false;
    }
  },
});

function submitButton(name, password) {
  emit("commit", { name, password });
}

const slots = defineSlots();

defineExpose({
  submitButton,
});

const attrs = useAttrs();

const count = ref(0);
const theme = {
  color: "red",
};

const vFocus = {
  beforeMount: (el) => {},
};
</script>

<template>
  <div v-bind="attrs">
    <span class="text">多个根组件</span>
  </div>
  <div>
    <a-button v-focus @click="count++">{{ count }}</a-button>
  </div>
</template>

<style lang="scss" scoped>
.text {
  color: v-bind("theme.color");
}
</style>
