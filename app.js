const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const pool = require("./db/pool");
const pgSession = require("connect-pg-simple")(session);
const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/messageRouter");
const auth = require("./auth");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
dotenv.config();

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());
passport.use(auth.strategy);
passport.serializeUser(auth.serializer);
passport.deserializeUser(auth.deserializer);

app.get("/", (req, res) => {
  return res.redirect("/messages");
});

app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.get("/login", (req, res) => {
  if (req.user) return res.redirect("/");
  return res.status(200).render("login", { title: "Log In" });
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    return res.redirect("/");
  });
});

app.listen(process.env.APP_PORT, (error) => {
  if (error) throw error;
  console.log("running...");
});
