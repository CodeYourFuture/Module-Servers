const express = require("express");
const cors = require("cors");

const app = express();

const chatRoutes = require("./chat-routes");

app.use(express.json());
app.use(cors());

app.use("/", chatRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is live on port: " + (process.env.PORT || 5000));
});
