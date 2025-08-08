import type { WidgetData } from "@glance/shared";
import { MarketsWidgetHandler } from "../widgets/markets";
import { RedditWidgetHandler } from "../widgets/reddit";
import { RSSWidgetHandler } from "../widgets/rss";
import { WeatherWidgetHandler } from "../widgets/weather";

const widgetHandlers = {
  rss: new RSSWidgetHandler(),
  reddit: new RedditWidgetHandler(),
  weather: new WeatherWidgetHandler(),
  markets: new MarketsWidgetHandler(),
  // Add more widget handlers as needed
};

export async function getWidgetData(
  widgetId: number
): Promise<WidgetData | null> {
  try {
    // TODO: Get widget configuration by ID from config
    // For now, return mock data
    return {
      id: widgetId,
      type: "rss",
      title: "Sample RSS Feed",
      content: "<div>Sample content</div>",
      contentAvailable: true,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to get widget data:", error);
    return null;
  }
}

export async function updateWidget(
  widgetId: number,
  data: any
): Promise<boolean> {
  try {
    // TODO: Implement widget update logic
    console.log(`Updating widget ${widgetId} with data:`, data);
    return true;
  } catch (error) {
    console.error("Failed to update widget:", error);
    return false;
  }
}

export function getWidgetHandler(type: string) {
  return widgetHandlers[type as keyof typeof widgetHandlers];
}
