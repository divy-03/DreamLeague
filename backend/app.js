const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// use cookie-parser later

app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const user = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
app.use("/api/v1", user);

module.exports = app;
