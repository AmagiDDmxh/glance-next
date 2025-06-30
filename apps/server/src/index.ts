import { serve } from "@hono/node-server";
import { Hono } from "hono";
// import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { authRouter } from "./routes/auth";
import { configRouter } from "./routes/config";
import { pagesRouter } from "./routes/pages";
import { widgetsRouter } from "./routes/widgets";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", cors());
app.use("*", secureHeaders());
// app.use("*", compress());

// Health check
app.get("/health", (c) =>
  c.json({ status: "ok", timestamp: new Date().toISOString() })
);

// API routes
app.route("/api/config", configRouter);
app.route("/api/pages", pagesRouter);
app.route("/api/widgets", widgetsRouter);
app.route("/api/auth", authRouter);

// Serve static assets
app.use("/assets/*", async (c) => {
  // TODO: Implement static asset serving
  return c.text("Static assets not implemented yet", 404);
});

// Catch all route for SPA
app.get("*", (c) => {
  // TODO: Serve the Next.js app
  return c.text("Glance Dashboard", 200);
});

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3001;

console.log(`🚀 Glance server starting on ${port}`);

serve({
  fetch: app.fetch,
  port,
});
