<script setup>
import { message } from "ant-design-vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { getMockInfo } from "@/api/demo";
import { postAnalysisResult } from "@/api/analysis";
import { onMounted, ref, shallowRef } from "vue";

const action = `${import.meta.env.ORIGIN_URL}/review/review`;

const fileInfo = ref(null);
const justify = ref("space-between");

const header = {
  authorization: "Bear 1234",
};

const accept = "image/*,.pdf,.doc,.docx,.xml,application/msword";

const data = {
  name: "png",
};

function handleUpload() {
  // todo
}

function handleChange({ file, fileList }) {
  /**
   * {
   *    file: {}
   *    fileList: []
   *    event: {}
   * }
   */
  const formData = new FormData();
  formData.append("files", file.originFileObj, file.name);

  postAnalysisResult(formData)
    .then(({ data }) => {
      fileInfo.value = data;
    })
    .catch((error) => {});
}

function handleDrop() {
  console.log();
}

function handleReject() {}

onMounted(() => {
  getMockInfo({ name: "aaa" })
    .then((res) => {
      console.log(res);
    })
    .catch();
});
</script>

<template>
  <div class="model-analysis">
    <type-writer class="type-writer" :file-name="fileInfo" />
    <a-upload-dragger
      name="file"
      :accept="accept"
      :header="header"
      :data="data"
      :multiple="false"
      :disabled="false"
      :show-upload-list="false"
      :customRequest="handleUpload"
      @change="handleChange"
      @drop="handleDrop"
      @reject="handleReject"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </a-upload-dragger>
  </div>
</template>

<style lang="scss" scoped>
.model-analysis {
  height: calc(100vh - 114px);
  display: grid;
  grid-auto-rows: auto 160px;
  align-content: space-between;
}
</style>
