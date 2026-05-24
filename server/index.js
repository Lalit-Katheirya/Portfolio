import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDatabase } from "./config/db.js";
import { Portfolio } from "./models/Portfolio.js";
import { Message } from "./models/Message.js";
import {
  fallbackPortfolio,
  seedPortfolioIfEmpty,
} from "./services/seedPortfolio.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
let dbConnected = false;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:8080",
  })
);
app.use(express.json());

// Serve frontend build from server/dist (same port as API)
// Build output should be placed at: server/dist
const distPath = path.resolve(__dirname, "./public/dist");
console.log("distPath ", distPath)
app.use(express.static(distPath));

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "API is healthy" });
});

app.get("/api/portfolio", async (_req, res) => {
  try {
    if (!dbConnected) {
      return res.json({ success: true, data: fallbackPortfolio });
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

    if (!dbConnected) {
      return res.status(503).json({
        success: false,
        message:
          "Database is offline. Start MongoDB (docker compose up mongo -d) to save messages.",
      });
    }

    await Message.create({ name, email, subject, message });
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

// SPA fallback (avoid catching /api routes)
app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const bootstrap = async () => {
  try {
    await connectDatabase();
    await seedPortfolioIfEmpty();
    dbConnected = true;
    // eslint-disable-next-line no-console
    console.log("MongoDB connected.");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      "MongoDB unavailable — portfolio API will use seed data. Contact form needs MongoDB.",
      error instanceof Error ? error.message : error
    );
    // eslint-disable-next-line no-console
    console.warn("Start MongoDB: docker compose up mongo -d");
  }

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${port}`);
  });
};

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Server start failed:", error);
  process.exit(1);
});
