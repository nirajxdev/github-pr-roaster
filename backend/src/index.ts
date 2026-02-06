import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { roastRouter } from "./routes/roast.js";

// Load environment variables (works from repo root or backend/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendEnv = path.resolve(__dirname, "../.env");
const backendEnvLocal = path.resolve(__dirname, "../.env.local");
const rootEnv = path.resolve(__dirname, "../../.env");
const rootEnvLocal = path.resolve(__dirname, "../../.env.local");
dotenv.config({ path: backendEnv });
dotenv.config({ path: backendEnvLocal });
dotenv.config({ path: rootEnv });
dotenv.config({ path: rootEnvLocal });

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "";
const DEFAULT_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3002",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3002",
];
const allowedOrigins = (CORS_ORIGIN ? CORS_ORIGIN.split(",") : DEFAULT_ORIGINS)
  .map((origin) => origin.trim())
  .filter(Boolean);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    if (process.env.NODE_ENV !== "production") {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
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
