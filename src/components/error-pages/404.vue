<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary" @click="handleChange">Back Home</a-button>
    </template>
  </a-result>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function handleChange() {
  /**
   * path ,name 不能同时存在
   * { path: '', name: '', params: {}, query: {}, hash: '#' }
   */
  router.push("/");
}
</script>

<style lang="scss" scoped></style>
