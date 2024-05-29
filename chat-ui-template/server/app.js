const express = require("express");
const morgan = require("morgan");
const chatRouter = require("./routes/chatHistoryRoutes");
const cors = require("cors");

const app = express();

//MIDDLEWARES

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(cors());

//MOUNTING THE ROUTER
app.use("/api/v1/chats", chatRouter);

module.exports = app;
