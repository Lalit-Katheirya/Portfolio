import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/db.js";
import { Portfolio } from "./models/Portfolio.js";
import { Message } from "./models/Message.js";
import { portfolioSeed } from "./data/seedPortfolio.js";

const app = express();
const port = process.env.PORT || 5000;
let isDbConnected = false;
let memoryPortfolio = structuredClone(portfolioSeed);
const memoryMessages = [];

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:8080",
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "API is healthy" });
});

app.get("/api/portfolio", async (_req, res) => {
  try {
    if (!isDbConnected) {
      return res.json({ success: true, data: memoryPortfolio });
    }

    const portfolio = await Portfolio.findOne().lean();
    if (!portfolio) {
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found." });
    }

    return res.json({ success: true, data: portfolio });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load portfolio.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (isDbConnected) {
      await Message.create({ name, email, subject, message });
    } else {
      memoryMessages.push({
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
      });
    }
    return res.status(201).json({
      success: true,
      message: "Message submitted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to submit message.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

const bootstrap = async () => {
  try {
    await connectDatabase();
    isDbConnected = true;

    const existing = await Portfolio.countDocuments();
    if (existing === 0) {
      await Portfolio.create(portfolioSeed);
      // eslint-disable-next-line no-console
      console.log("Seeded portfolio content.");
    }
  } catch (error) {
    isDbConnected = false;
    memoryPortfolio = structuredClone(portfolioSeed);
    // eslint-disable-next-line no-console
    console.warn("MongoDB unavailable. Server started in memory mode.");
    // eslint-disable-next-line no-console
    console.warn(
      "Set MONGODB_URI in .env and run MongoDB to enable persistence."
    );
    // eslint-disable-next-line no-console
    console.warn(error instanceof Error ? error.message : "Unknown DB error");
  }

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Server running on http://localhost:${port} (${isDbConnected ? "mongodb" : "memory mode"})`
    );
  });
};

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Server start failed:", error);
  process.exit(1);
});
