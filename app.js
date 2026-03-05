const express = require("express");
const routes = require("./router/expenseroute");
const auth_routes = require("./router/authroute");
const connect = require("./db/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-tracker-frontend-alpha-six.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(cookieParser());

app.use("/api/auth", auth_routes);
app.use("/expense", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
