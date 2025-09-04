const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const auth = require("./auth");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
dotenv.config();

app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.session());
passport.use(auth.strategy);
passport.serializeUser(auth.serializer);
passport.deserializeUser(auth.deserializer);

app.get("/", (req, res) => {
  res.render('home', {title: 'Home Page', user: req.user})
});

app.use("/user", userRouter);

app.get("/login", (req, res) => {
  res.status(200).render("login", { title: "Log In" });
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

app.listen(process.env.APP_PORT, (error) => {
  if (error) throw error;
  console.log("running...");
});
