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
const allowAllOrigins = allowedOrigins.length === 0;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }
    if (allowAllOrigins) {
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
    callback(new Error(`Not allowed by CORS: ${origin}`));
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
  const message = err instanceof Error ? err.message : "Internal server error.";
  res.status(500).json({
    success: false,
    error: message,
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log("");
  console.log("PR ROASTER API SERVER");
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`CORS:   ${allowAllOrigins ? "ALLOW_ALL" : CORS_ORIGIN || DEFAULT_ORIGINS.join(", ")}`);
  console.log("Endpoints:");
  console.log("  GET  /health");
  console.log("  POST /api/roast");
  console.log("");
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
    console.error("Stop the other process or set PORT in backend/.env to a free port.");
    process.exit(1);
  }

  if (error.code === "EACCES") {
    console.error(`Insufficient permissions to bind to port ${PORT}.`);
    console.error("Try a higher port like 3001+ or run with elevated permissions.");
    process.exit(1);
  }

  console.error("Server failed to start:", error);
  process.exit(1);
});

export default app;
