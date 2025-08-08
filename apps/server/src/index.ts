import { Hono } from "hono";
// import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { trimTrailingSlash } from "hono/trailing-slash";
import { authRouter } from "./routes/auth.js";
import { configRouter } from "./routes/config.js";
import { pagesRouter } from "./routes/pages.js";
import { widgetsRouter } from "./routes/widgets.js";

const app = new Hono();

// Middleware
app.use(logger());
app.use(cors());
// app.use(csrf());
app.use(prettyJSON());
app.use(secureHeaders());
app.use(trimTrailingSlash());

// app.use("*", compress());

// Health check
app.get("/health", (c) =>
  c.json({ status: "ok", timestamp: new Date().toISOString() })
);

// API routes
app.route("/config", configRouter);
app.route("/pages", pagesRouter);
app.route("/widgets", widgetsRouter);
app.route("/auth", authRouter);

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

export default app;
