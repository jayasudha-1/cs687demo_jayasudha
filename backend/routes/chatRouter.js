const express = require("express");
const router = express.Router();

// Use dynamic import for node-fetch
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

router.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    // Include a system instruction for finance-specific responses
    const systemMessage = {
      role: "system",
      content:
        "You are a financial advisor. Answer questions only related to personal finance, savings, budgeting, and investments. Keep responses concise and actionable.",
    };

    const formattedMessages = [systemMessage, ...messages];

    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral", // Use a finance-specific model
        messages: formattedMessages,
        stream: true, // Enable streaming for faster response
      }),
      timeout: 10000, // Timeout after 10 seconds
    });

    // Stream response back to frontend
    response.body.pipe(res);
  } catch (error) {
    console.error("Error communicating with Ollama:", error);
    res.status(500).json({ error: "Failed to fetch chat response" });
  }
});

module.exports = router;
