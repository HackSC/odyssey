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

router.get("/multiply", async (req, res) => {
  const a = parseFloat(req.query.a) || 0;
  const b = parseFloat(req.query.b) || 0;

  const result = a * b;

  return res.json({
    result
  })
});

export default router;
