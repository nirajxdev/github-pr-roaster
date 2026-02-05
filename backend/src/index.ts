import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { roastRouter } from "./routes/roast.js";

// Load environment variables (works from repo root or backend/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "PR Roaster API is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api", roastRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Server Error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error. The roasting engine encountered a problem.",
  });
});

// Start server
app.listen(PORT, () => {
  console.log("");
  console.log("PR ROASTER API SERVER");
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`CORS:   ${CORS_ORIGIN}`);
  console.log("Endpoints:");
  console.log("  GET  /health");
  console.log("  POST /api/roast");
  console.log("");
});

export default app;
