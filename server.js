require("dotenv").config();

console.log("MY NEW SERVER FILE LOADED");

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("StoryForge AI Server is Running 🚀");
});
app.get("/test", (req, res) => {
  res.send("TEST WORKING");
});
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/generate-story", async (req, res) => {
  console.log("GENERATE STORY API HIT");
  try {
    const { prompt, genre, tone } = req.body;

    const fullPrompt = `
You are StoryForge AI.

Write a high quality story.

Genre: ${genre}
Tone: ${tone}
User Idea: ${prompt}

Requirements:
- Creative and engaging
- 500-800 words
- Strong opening
- Good ending
- Rich descriptions
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });

    res.json({
      story: response.text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate story",
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("StoryForge AI running on port 3000");
});

