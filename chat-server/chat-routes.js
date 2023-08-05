const express = require("express");
const router = express.Router();

const welcomeMessage = {
  id: "bb0d4acf-6be5-4800-b88f-bb4689c270c7",
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

router.get("/messages", (req, res) => {
  res.json(messages);
});

router.post("/send", (req, res) => {
  try {
    const message = req.body;
    if (!message.from && !message.text) {
      return res.status(404).json({ message: "Message was empty" });
    }
    messages.push(message);
    res
      .status(200)
      .json({ success: true, message: "Message received successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the request.",
    });
  }
});

router.delete("/messages/:pid", (req, res) => {
  try {
    const messageId = req.params.pid;
    const index = messages.findIndex((message) => message.id === messageId);
    if (index !== -1) {
      messages.splice(index, 1);
      res.status(200).json({ message: "Place deleted." });
    } else {
      res.status(404).json({ message: "Something went wrong." });
    }
  } catch (error) {}
});

router.patch("/messages/:pid", (req, res) => {
  try {
    const messageId = req.params.pid;
    const updatedMessage = req.body;
    const index = messages.findIndex((message) => message.id === messageId);
    if (index !== -1) {
      messages[index] = {
        ...messages[index],
        ...updatedMessage,
      };
      res.status(200).json({ message: "Message updated successfully" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {}
});

module.exports = router;
