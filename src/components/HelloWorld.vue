<script setup>
import { onMounted, ref } from "vue";
import styles from "@/styles/base.module.css";
console.log(styles);
onMounted(() => {
  document.getElementById("btn").className = styles["btnBg"];
});
defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
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
