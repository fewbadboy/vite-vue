<template>
  <a-result status="status" title="title" sub-title="subTitle">
    <template #extra>
      <a-button key="console" type="primary">Go Console</a-button>
      <a-button key="buy">Buy Again</a-button>
    </template>
  </a-result>
</template>

<script setup>
defineProps({
  status: {
    type: String,
    validator(value, props) {
      return ["success", "error", "info", "warning"].includes(value);
    },
    default() {
      return "info";
    },
  },
  title: {
    type: String,
  },
  subTitle: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
