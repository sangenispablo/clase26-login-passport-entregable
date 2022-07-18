require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

const { initializePassport } = require("./middlewares/passport.config");

// mongo
const { dbConnection } = require("./database/config");

// rutas
const apiRouter = require("./routes/apiRouter");

// env port
const PORT = process.env.PORT || 8080;

const app = express();

initializePassport();

app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_CNN_LOCAL }),
    secret: "c0d3r",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 30000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// mis rutas
app.use("/", apiRouter);

// conecto a Mongo
dbConnection();

// start server
app.listen(PORT, () => {
  console.log(`API esta escuchando el puerto: ${PORT}`);
});
