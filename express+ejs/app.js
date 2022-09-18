const ejs = require("ejs");
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3001;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("index", { users });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.post("/user", async (req, res) => {
  try {
    await User.create(req.body);
    const users = await User.findAll();
    res.render("index", { users });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
