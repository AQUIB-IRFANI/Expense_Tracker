const express = require("express");
const routes = require("./router/expenseroute");
const auth_routes = require("./router/authroute");
const connect = require("./db/db");
const MongoStore = require("connect-mongo").default;
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://expense-tracker-frontend-alpha-six.vercel.app",
    credentials: true,
  })
);
app.set("trust proxy", 1);
console.log(MongoStore);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "expense-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

connect();

app.use("/api/auth", auth_routes);
app.use("/expense", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
