import { Hono } from "hono";
import { loadConfig } from "../services/config.js";

const router = new Hono();

// Get all pages
router.get("/", async (c) => {
  try {
    const config = await loadConfig();
    return c.json(config.pages);
  } catch (error) {
    return c.json({ error: "Failed to load pages" }, 500);
  }
});

// Get page by slug
router.get("/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const config = await loadConfig();
    const page = config.pages.find((p) => p.slug === slug);

    if (!page) {
      return c.json({ error: "Page not found" }, 404);
    }

    return c.json(page);
  } catch (error) {
    return c.json({ error: "Failed to load page" }, 500);
  }
});

export { router as pagesRouter };
