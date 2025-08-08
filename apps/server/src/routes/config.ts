import { Hono } from "hono";
import { loadConfig } from "../services/config.js";

const router = new Hono();

// Get configuration
router.get("/", async (c) => {
  try {
    const config = await loadConfig();
    return c.json(config, 200);
  } catch (error) {
    return c.json({ error: "Failed to load configuration" }, 500);
  }
});

// Get theme configuration
router.get("/theme", async (c) => {
  try {
    const config = await loadConfig();
    return c.json(config.theme, 200);
  } catch (error) {
    return c.json({ error: "Failed to load theme configuration" }, 500);
  }
});

// Get branding configuration
router.get("/branding", async (c) => {
  try {
    const config = await loadConfig();
    return c.json(config.branding, 200);
  } catch (error) {
    return c.json({ error: "Failed to load branding configuration" }, 500);
  }
});

export { router as configRouter };
