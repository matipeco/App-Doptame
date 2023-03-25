const Role = require("../models/Roles");

const createRole = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count < 0) return;

    const value = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "apa" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(value);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createRole;
