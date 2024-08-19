<template>
  <a-space wrap>
    <a-button type="primary" @click="handleSignIn">登录</a-button>
    <a-button @click="handleSignUp">登记</a-button>
  </a-space>
</template>

<script setup>
import { useRouter } from "vue-router";
import { setToken } from "@/utils/auth";

const router = useRouter();

function handleSignIn() {
  setToken("Bear 123456");
  router.push("/");
}

function handleSignUp() {
  router.push("/sign-up");
}
</script>

<style lang="scss" scoped></style>
