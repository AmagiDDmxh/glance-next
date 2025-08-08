import type { WidgetData } from "@glance/shared";
import { useEffect, useState } from "react";
import { env } from "@/env";

export function useWidgetData(widgetId: number) {
  const [data, setData] = useState<WidgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWidgetData() {
      try {
        setLoading(true);
        const response = await fetch(
          `${env.NEXT_PUBLIC_SERVER_URL}/widgets/${widgetId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch widget data");
        }

        const widgetData = await response.json();
        setData(widgetData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchWidgetData();
  }, [widgetId]);

  return { data, loading, error };
}
