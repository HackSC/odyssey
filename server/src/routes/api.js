/*
  Route handler for API
*/

import express from "express";

const router = express.Router();

router.get("/random", async (req, res) => {
  const messages = [
    "Cat",
    "Dog",
    "Bird",
    "Fish"
  ];

  const randomMessageIndex = Math.floor(Math.random() * messages.length);

  return res.json({
    message: messages[randomMessageIndex]
  })
});

export default router;
