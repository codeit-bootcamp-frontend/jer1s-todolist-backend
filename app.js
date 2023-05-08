const express = require("express");

const app = express();

const db = require("./models");
const User = db.User;

app.use(express.json());

app.get("/api/users", async (req, res) => {
  const Users = await User.findAll();
  res.send(Users);
});

app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id: id } });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "There is no such user" });
  }
});

app.post("/api/users", async (req, res) => {
  const newUser = req.body;
  const user = await User.create(newUser);
  res.send(user);
});

app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const result = await User.update(newInfo, { where: { id } });
  if (result[0]) {
    res.send({ message: `${result[0]} row(s) affected` });
  } else {
    res.status(404).send({ message: "There is no user with the id!" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const deleteCount = await User.destroy({ where: { id } });
  if (deleteCount) {
    res.send({ message: `${deleteCount} row(s) deleted ` });
  } else {
    res.status(404).send({ message: "There is no user with the id!" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening...");
});
