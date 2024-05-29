const mongoose = require("mongoose");

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: "ChatHistory",
  })
  .then(() => {
    console.log("connection success");
  });

const chatSchema = new mongoose.Schema({
  question: {
    type: String,
    trim: true,
  },
  answer: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const History = mongoose.model("History", chatSchema);

module.exports = History;
