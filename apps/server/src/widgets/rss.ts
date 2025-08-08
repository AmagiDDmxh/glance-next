import type { RSSFeed, RSSWidget } from "@glance/shared";
import Parser from "rss-parser";

const parser = new Parser();

export class RSSWidgetHandler {
  async fetchData(widget: RSSWidget): Promise<any> {
    try {
      const allItems: any[] = [];

      for (const feed of widget.feeds) {
        const items = await this.fetchRSSFeed(feed);
        allItems.push(...items);
      }

      // Sort by date and limit
      const sortedItems = allItems
        .sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        )
        .slice(0, widget.limit || 10);

      return { items: sortedItems };
    } catch (error) {
      console.error("RSS widget error:", error);
      throw error;
    }
  }

  private async fetchRSSFeed(feed: RSSFeed): Promise<any[]> {
    try {
      const doc = await parser.parseURL(feed.url);
      return doc.items.slice(0, feed.limit || doc.length);
    } catch (error) {
      console.error(`Failed to fetch RSS feed ${feed.url}:`, error);
      return [];
    }
  }
}
