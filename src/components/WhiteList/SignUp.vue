<template>
  <a-space wrap>
    <a-button type="primary" @click="handleSignUp">登记</a-button>
    <a-button @click="handleSignIN">登录</a-button>
  </a-space>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

function handleSignUp() {
  // todo
}

function handleSignIN() {
  router.push("/sign-in");
}
</script>

<style lang="scss" scoped></style>
