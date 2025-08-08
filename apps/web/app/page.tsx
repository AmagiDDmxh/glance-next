"use client";

import type { PageData } from "@glance/shared";
import { useEffect, useState } from "react";
import { LoadingSpinner, Page } from "../components/ui";
import { env } from "../env";

export default function HomePage() {
  const [pageData, setPageData] = useState<PageData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPageData() {
      try {
        const response = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/pages`);
        if (!response.ok) {
          throw new Error("Failed to load pages data");
        }
        const data = await response.json();
        setPageData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    loadPageData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="error-message">
          <h2 className="mb-2 font-semibold text-xl">
            Error Loading Dashboard
          </h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 font-semibold text-xl">No Data Available</h2>
          <p>Please check your configuration.</p>
        </div>
      </div>
    );
  }

  return pageData.map((page, idx) => (
    <Page key={`page ${page.title} ${idx}`} page={page} />
  ));
}
