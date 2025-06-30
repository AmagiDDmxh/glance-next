import type { ThemeConfig } from "@glance/shared";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cache } from "react";

import { hslString } from "@/lib/utils";
import { NavigationHeader } from "../components/ui/common/NavigationHeader";
import { env } from "../env";

import "../css/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Glance Dashboard",
  description:
    "A modern dashboard for monitoring and displaying various data sources",
};

const loadPageData = cache(async () => {
  try {
    const pagesRes = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/api/pages`);
    const configRes = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/api/config`);
    if (!(pagesRes.ok && configRes.ok)) {
      throw new Error("Failed to load page data");
    }
    const pages = await pagesRes.json();
    const config = await configRes.json();

    return {
      pages,
      config,
    };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "An error occurred");
  }
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pages, config } = await loadPageData();

  return (
    <html data-scheme={config.theme.light ? "light" : "dark"} lang="en">
      <head>
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: getRootCss(config.theme),
          }}
          id="theme-style"
        />
      </head>
      <body className={inter.className}>
        <div className="body-content flex flex-column" id="root">
          <NavigationHeader config={config} pages={pages} />
          {children}
        </div>
      </body>
    </html>
  );
}

function getRootCss(vars: ThemeConfig) {
  return `
:root {
  ${vars.backgroundColor ? `--bgh: ${vars.backgroundColor.h};` : ""}
  ${vars.backgroundColor ? `--bgs: ${vars.backgroundColor.s}%;` : ""}
  ${vars.backgroundColor ? `--bgl: ${vars.backgroundColor.l}%;` : ""}
  ${vars.contrastMultiplier !== 0 ? `--cm: ${vars.contrastMultiplier};` : ""}
  ${
    vars.textSaturationMultiplier !== 0
      ? `--tsm: ${vars.textSaturationMultiplier};`
      : ""
  }
  ${vars.primaryColor && `--color-primary: ${hslString(vars.primaryColor)};`}
  ${vars.positiveColor && `--color-positive: ${hslString(vars.positiveColor)};`}
  ${vars.negativeColor && `--color-negative: ${hslString(vars.negativeColor)};`}
}
`.trim();
}
