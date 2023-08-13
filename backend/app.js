const express = require("express");
const collection = require("./mongo");
const collection1 = require("./mongo1")
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/login", async (req, res) => {
  const { Login_data, password } = req.body;
  try {
    const check = await collection.findOne({ Login_data: Login_data });
    console.log(check);
    if (check) {
      res.json(check);
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});

app.post("/dashboard", async (req, res) => {
  const { user_name, amount } = req.body;
  const data = {
    user_name: user_name,
    amount: amount,
  };
    await collection1.insertMany([data]);
    const loan_data = await collection1.find()
    history("/dashboard");
  
});

app.post("/signup", async (req, res) => {
  const { Login_data, password } = req.body;
  const data = {
    Login_data: Login_data,
    password: password,
  };
  try {
    const check = await collection.findOne({ Login_data: Login_data });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("notexist");
  }
});

app.post("/phone", async (req, res) => {
  const { Login_data, password } = req.body;
  const data = {
    Login_data: Login_data,
    password: password,
  };
  try {
    const check = await collection.findOne({ Login_data: Login_data });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("notexist");
  }
});

app.listen(process.env.PORT || 8000, () => {
  console.log("port is connected");
});
