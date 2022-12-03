const express = require("express");
const cors = require("cors");
const DB = require("./config/DB");
const app = express();
require("dotenv").config();

DB();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// routes dependency
const userRoutes = require("./routers/users.routes")
const mailRoutes = require("./routers/email.routes")

// super-admin apis
app.use("/user", userRoutes);
app.use("/mail", mailRoutes);

// server listen 
app.listen(process.env.PORT, () => {
  console.log("Server Connected: " + process.env.PORT);
});
 