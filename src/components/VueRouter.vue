<script setup>
import { nextTick, ref } from "vue";
import { Modal } from "ant-design-vue";
import {
  useRouter,
  useRoute,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import VCode from "vue3-puzzle-vcode";

const router = useRouter();

const open = ref(false);

onBeforeRouteUpdate(async (to, form) => {
  if (to.hash.id !== from.hash.id) {
    // todo
  }
});
onBeforeRouteLeave(async (to, from) => {
  // const answer = window.confirm(
  //   'Do you really want to leave? you have unsaved changes!'
  // )
  // 取消导航并停留在同一页面上
  // if (!answer) return false
  // router.push(to)
});

function handleOk() {
  open.value = false;
}

function handleClick() {
  router.push("/cat/mimi");
}

function success() {
  console.log("success");
}

function close() {}
</script>

<template>
  <div>
    测试
    <button class="btn-custom">测试</button>
    <a-space wrap>
      <a-button type="primary" @click="handleClick">Cat</a-button>
    </a-space>
    <VCode :show="true" :type="'inside'" @success="success" @close="close" />
    <router-view />
    <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped></style>
