import { fakerZH_CN } from "@faker-js/faker";

export function mockUsers() {
  const users = [];
  for (let index = 0; index < 22; index++) {
    users.push({
      id: index + 1,
      uuid: fakerZH_CN.string.uuid(),
      name: fakerZH_CN.person.fullName({ sex: "male" }),
      password: fakerZH_CN.internet.password({ length: 8, pattern: /\w/ }),
      age: fakerZH_CN.number.int({ min: 20, max: 60 }),
      phone: fakerZH_CN.phone.number(),
      avatar: fakerZH_CN.image.avatar(),
      email: fakerZH_CN.internet.email(),
      city: fakerZH_CN.location.city(),
      ipv4: fakerZH_CN.internet.ipv4(),
      birthday: fakerZH_CN.date.birthdate({ min: 18, max: 65, mode: "age" }),
      company: fakerZH_CN.company.name(),
      version: fakerZH_CN.system.semver(),
      skills: fakerZH_CN.helpers.arrayElements(["html", "css", "js", "java"], {
        min: 1,
        max: 3,
      }),
      push: fakerZH_CN.helpers.arrayElement(["success", "fail"]),
      color: fakerZH_CN.color.rgb(),
    });
  }
  return users;
}
