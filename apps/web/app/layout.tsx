import type { HSLColor, ThemeConfig } from "@glance/shared";
import { cache } from "react";
import { hslString } from "@/lib/utils";
import { NavigationHeader } from "../components/ui/common/NavigationHeader";
import { env } from "../env";

import "../css/globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = () => ({
  title: "Glance Dashboard",
  description:
    "A modern dashboard for monitoring and displaying various data sources",
});

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
    <html
      data-scheme={config.theme.light ? "light" : "dark"}
      data-theme={config.theme.key}
      id="top"
      lang="en"
    >
      <head>
        {/* document-head-before */}
        <link
          as="script"
          href="/js/templating.js"
          key="templating.js"
          rel="preload"
        />
        <link href="/js/page.js" key="page.js" rel="prefetch" />

        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: getRootCss(config.theme),
          }}
          id="theme-style"
          key="theme-style"
        />

        {/* document-head-after */}
        <link href="/css/login.css" key="login.css" rel="stylesheet" />
        <script key="login.js" src="/js/login.js" type="module" />
      </head>
      <body className="">
        <div className="body-content flex flex-column" id="root">
          <NavigationHeader config={config} pages={pages} />
          {children}
        </div>
      </body>
    </html>
  );
}

function parseHSL(val?: HSLColor) {
  if (typeof val === "string") {
    try {
      const [, h = 0, s = 0, l = 95] = val.match(/(\d+)\s(\d+)\s(\d+)/) ?? [];
      return { h, s, l };
    } catch {
      return { h: 0, s: 0, l: 95 };
    }
  }

  if (val?.h) {
    return val;
  }

  return { h: 0, s: 0, l: 95 };
}

function getRootCss(vars: ThemeConfig) {
  const { h, s, l } = parseHSL(vars.backgroundColor);

  return `
:root {
  ${vars.backgroundColor ? `--bgh: ${h};` : ""}
  ${vars.backgroundColor ? `--bgs: ${s}%;` : ""}
  ${vars.backgroundColor ? `--bgl: ${l}%;` : ""}
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
