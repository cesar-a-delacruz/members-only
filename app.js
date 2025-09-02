const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
dotenv.config();

app.use("/user", userRouter);

app.listen(process.env.APP_PORT, (error) => {
  if (error) throw error;
  console.log("running...");
});
