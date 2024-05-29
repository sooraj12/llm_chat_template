const History = require("./../model/chatHistoryModel");

exports.getHistoryById = async (req, res) => {
  console.log(req.params.id);
  try {
    const id = req.params.id;
    const chatHistory = await History.findById(id);
    res.status(200).json({
      status: "success",
      data: { chatHistory },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllTHistory = async (req, res) => {
  console.log(req.query);

  try {
    const chatHistory = await History.aggregate([
      { $sort: { createdAt: -1 } },
      { $project: { question: 1 } },
    ]);
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      results: chatHistory.length,
      data: { chatHistory },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "invalid request",
    });
  }
};

exports.createNewChat = async (req, res) => {
  console.log(req.body);
  try {
    const chatHistory = await History.create(req.body);
    res.status(201).json({
      status: "success",
      data: { chatHistory },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: "Invalid data",
    });
  }
};
