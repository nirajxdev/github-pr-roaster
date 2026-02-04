import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { roastRouter } from "./routes/roast.js";

// Load environment variables
dotenv.config();

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
    timestamp: new Date().toISOString()
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
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🔥 PR ROASTER API SERVER 🔥                                ║
║                                                              ║
║   Server running on: http://localhost:${PORT}                   ║
║   CORS Origin: ${CORS_ORIGIN.padEnd(35)}            ║
║                                                              ║
║   Endpoints:                                                 ║
║   - GET  /health     - Health check                          ║
║   - POST /api/roast  - Roast a PR or code                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
  `);
});

export default app;
