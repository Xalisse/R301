const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const sequelize = new Sequelize("M3104", "root", "root", {
    host: "localhost",
    port: 8889,
    dialect: "mysql",
  });
  sequelize.authenticate();

  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      username: DataTypes.TEXT,
      email: DataTypes.TEXT,
    },
    {
      tableName: "user",
      timestamps: false,
      synchronize: true,
    }
  );
  try {
    const users = await User.findAll();
    res.write("Users\n");
    users.forEach((user) => {
      res.write(`${user.username}\n`);
    });
    res.end();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
