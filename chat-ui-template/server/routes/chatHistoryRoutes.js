const express = require("express");
const chatController = require(`./../controller/chatHistoryController.js`);
const router = express.Router();

router
  .route("/")
  .get(chatController.getAllTHistory)
  .post(chatController.createNewChat);

router.route("/:id").get(chatController.getHistoryById);

module.exports = router;
