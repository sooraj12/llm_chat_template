const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = require("./server/app.js");

//START SERVER
const port = process.env.PORT || 3830;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
