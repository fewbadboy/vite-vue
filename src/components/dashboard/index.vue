<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-statistic title="在线人数" :value="8642" class="text-center" />
      </a-col>
      <a-col :span="8">
        <a-statistic title="充值金额" :value="4882640" class="text-center" />
      </a-col>
      <a-col :span="8">
        <a-statistic
          title="体现金额"
          :value="224468.88"
          :precision="2"
          class="text-center"
        />
      </a-col>
    </a-row>
    <a-drawer v-model:open="openDrawer" placement="right" root-class-name="">
      <a-list
        v-if="comments.length"
        :data-source="comments"
        item-layout="horizontal"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-comment
              :author="item.author"
              :avatar="item.avatar"
              :content="item.content"
              :datetime="item.datetime"
            />
          </a-list-item>
        </template>
      </a-list>
      <a-comment>
        <template #avatar>
          <a-avatar style="background-color: #87d068">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
        </template>
        <template #content>
          <a-form-item>
            <a-textarea v-model:value="questionValue" :rows="4" />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :loading="submitting"
              @click="handleSubmit"
            >
              Ask Question
            </a-button>
          </a-form-item>
        </template>
      </a-comment>
    </a-drawer>
    <a-float-button-group
      trigger="click"
      type="primary"
      :style="{ right: '24px' }"
    >
      <template #icon>
        <CustomerServiceOutlined />
      </template>
      <a-float-button @click="handleHelpClick" />
      <a-float-button @click="handleCommentClick">
        <template #icon>
          <CommentOutlined />
        </template>
      </a-float-button>
    </a-float-button-group>
  </div>
</template>

<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { message } from "ant-design-vue";
import {
  UserOutlined,
  CustomerServiceOutlined,
  CommentOutlined,
} from "@ant-design/icons-vue";

const openDrawer = ref(false);

const questionValue = ref("");

const submitting = ref(false);

const comments = ref([]);

function handleSubmit() {
  comments.value = [
    {
      author: "admin",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: questionValue.value,
      datetime: dayjs().fromNow(),
    },
    ...comments.value,
  ];
}

function handleHelpClick() {
  message.success("This is a success message");
}

function handleCommentClick() {
  openDrawer.value = true;
}
</script>

<style lang="scss" scoped></style>
