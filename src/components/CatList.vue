<template>
  <div>
    Cat - List - {{ customName }}
    <a-button type="primary" danger @click="handleSignOut">注销</a-button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
const auth = useAuthStore();
const { authorization } = storeToRefs(auth);
const router = useRouter();

const props = defineProps({
  customName: {
    type: String,
    default: "custom-name",
  },
});

function handleSignOut() {
  auth.authorization = "";
  router.push("/sign-in");
}
</script>

<style lang="scss" scoped></style>
