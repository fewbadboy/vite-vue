export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "left",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sorter: {
      multiple: 2,
    },
    width: 60, // '20%'
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    sorter: {
      multiple: 1,
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
    ellipsis: true,
  },
  {
    title: "Push",
    dataIndex: "push",
    key: "push",
    filters: [
      { text: "Success", value: "success" },
      { text: "Fail", value: "fail" },
    ],
  },
  {
    title: "Version",
    dataIndex: "version",
    key: "version",
  },
  {
    title: "Operation",
    dataIndex: "operation",
    fixed: "right",
  },
];

export const rules = {
  name: [
    {
      required: true,
      message: "Please input name",
      trigger: "change",
    },
    {
      min: 3,
      max: 8,
      message: "Length should be 3 to 8",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input password",
      trigger: "blur",
    },
  ],
  age: [
    {
      required: true,
      message: "Please input age",
      trigger: "change",
    },
  ],
  skills: [
    {
      type: "array",
      required: true,
      message: "Please select at least one skill",
      trigger: "change",
    },
  ],
};

export async function checkName(rule, value) {
  if (value === "") {
    return Promise.reject("Please input name");
  }
  return Promise.resolve();
}
export async function checkPassword(rule, value) {
  if (value === "") {
    return Promise.reject("Please input password");
  }
  return Promise.resolve();
}
export async function checkAge(rule, value) {
  if (!value) {
    return Promise.reject("Please input age");
  }
  return Promise.resolve();
}
export async function checkSkills(rule, value) {
  if (value.length) {
    return Promise.reject("Please select at least one skill");
  }
  return Promise.resolve();
}

export const rules1 = {
  name: [{ required: true, validator: checkName, trigger: "change" }],
  password: [{ required: true, validator: checkPassword, trigger: "change" }],
  age: [{ required: true, validator: checkAge, trigger: "change" }],
  skills: [{ required: true, validator: checkSkills, trigger: "change" }],
};
