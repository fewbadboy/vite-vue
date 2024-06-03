<template>
  <a-table
    bordered
    :loading="loadingTable"
    :row-key="(record) => record.uuid"
    :row-selection="rowSelection"
    :dataSource="dataSource"
    :columns="columns"
    :pagination="pagination"
    @change="handleTableChange"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <SmileOutlined />
          Name
        </span>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-space>
          <a-button type="primary" @click="handleEdit(record)">编辑</a-button>
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="handleDelete(record.key)"
          >
            <a-button type="primary" danger>Delete</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </template>
    <template #title>Header</template>
    <template #footer>Footer</template>
  </a-table>
  <a-modal
    v-model:open="openModel"
    title="编辑"
    ok-text="确认"
    cancel-text="取消"
    :confirm-loading="confirmLoading"
    @ok="handleSave"
  >
    <a-form
      ref="formRef"
      :autocomplete="'off'"
      :model="formData"
      :rules="rules1"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="Username" name="name" has-feedback>
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-form-item label="Password" name="password">
        <a-input-password v-model:value="formData.password">
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item label="Age" name="age">
        <a-input-number v-model:value="formData.age" />
      </a-form-item>
      <a-form-item label="Skills">
        <a-checkbox-group v-model:value="formData.skills">
          <a-checkbox value="html" name="skills">html</a-checkbox>
          <a-checkbox value="css" name="skills">css</a-checkbox>
          <a-checkbox value="js" name="skills">js</a-checkbox>
          <a-checkbox value="java" name="skills">java</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="handleTest">Test</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { computed, reactive, ref, toRaw } from "vue";
import { SmileOutlined, LockOutlined } from "@ant-design/icons-vue";
import { columns, rules1 } from "./complexTable";
import { mockUsers } from "@/mock/table";

const loadingTable = ref(false);
const rowSelection = ref({
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows,
    );
  },
  onSelect: (record, selected, selectedRows) => {
    // todo
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    // todo
  },
});
const dataSource = ref([...mockUsers()]);

const openModel = ref(false);
const confirmLoading = ref(false);
const pageSize = ref(10);

const formRef = ref(null);
const formData = reactive({
  id: 0,
  name: "",
  password: "",
  age: 0,
  skills: [],
});

const pagination = computed(() => ({
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ["10", "20", "50"],
  total: 22,
  current: 1,
  pageSize: pageSize.value,
}));

function handleTableChange(page, filters, sorter) {
  /**
   * page.pageSize/current/total
   * filters: []
   * sorter.field/order["ascend"/"descend"] 多排序为数组
   */
  console.log(page, filters, sorter);
}

function handleEdit(record) {
  const { id, name, password, age, skills } = record;
  formData.id = id;
  formData.name = name;
  formData.password = password;
  formData.age = age;
  formData.skills = skills;

  openModel.value = true;
}

function handleDelete(id) {}

function handleTest() {
  console.log(formData);
  console.log(toRaw(formData));
}

function handleSave() {
  confirmLoading.value = true;
  setTimeout(() => {
    // formRef.value.validateFields()
    // formRef.value.clearValidate()
    formRef.value.resetFields();
    confirmLoading.value = false;
    openModel.value = false;
  }, 2000);
}
</script>

<style lang="scss" scoped></style>
