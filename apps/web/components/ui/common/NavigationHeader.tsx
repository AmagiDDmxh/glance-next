"use client";

import type { GlanceConfig, PageData } from "@glance/shared";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { ThemePresetPreview } from "./ThemePresetPreview";

export function NavigationHeader({
  pages,
  config,
}: {
  pages?: PageData[];
  config: GlanceConfig;
}) {
  const path = usePathname();
  const current = pages?.find((x) => {
    if (x.slug === "home" || x.slug === "") {
      return path === "" || path === "/";
    }

    return x.slug === path;
  });

  if (!pages) {
    return null;
  }

  return (
    <div
      className={`header-container content-bounds content-bounds-${current?.desktopNavigationWidth}`}
    >
      <div className="header padding-inline-widget widget-content-frame flex">
        <div aria-hidden="true" className="logo">
          {config.branding.logoURL ? (
            <Image alt="" src={config.branding.logoURL} />
          ) : (
            config.branding.logoText || (
              <svg
                fill="none"
                style={{ maxHeight: "2rem" }}
                viewBox="0 0 108 108"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>default logo</title>
                <rect
                  fill="var(--color-text-subdue)"
                  height="108"
                  rx="6.875"
                  width="50"
                />
                <path
                  clipRule="evenodd"
                  d="M64.875 0C61.078 0 58 3.07804 58 6.875V43.125C58 46.922 61.078 50 64.875 50H101.125C104.922 50 108 46.922 108 43.125V6.875C108 3.07804 104.922 0 101.125 0H64.875ZM75.7545 11L71.3078 15.6814H85.2233C85.9209 15.6814 86.5835 15.6633 87.2113 15.627C87.839 15.5544 88.3273 15.4093 88.6761 15.1915L70 34.5706L73.4004 38L91.8149 18.7843C91.6056 19.1835 91.4487 19.7097 91.3441 20.3629C91.2743 20.9798 91.2394 21.5968 91.2394 22.2137V37.1835L96 32.2843V11H75.7545Z"
                  fill="var(--color-primary)"
                  fillRule="evenodd"
                />
                <rect
                  fill="var(--color-text-base)"
                  height="50"
                  rx="6.875"
                  width="50"
                  x="58"
                  y="58"
                />
              </svg>
            )
          )}
        </div>
        <nav className="nav hide-scrollbars flex grow">
          {pages.map((page) => (
            <Link
              aria-current={path === page.slug ? "page" : undefined}
              className={`nav-item ${
                current === page ? "nav-item-current" : ""
              }`}
              href={`/${page.slug}`}
              key={page.slug}
            >
              {page.title ?? page.name}
            </Link>
          ))}
        </nav>
        {/* TODO: Theme Picker */}
        {/* {!config.theme.disablePicker && (
          <div
            className="theme-picker self-center"
            data-popover-position="below"
            data-popover-show-delay="0"
            data-popover-type="html"
          >
            <div className="current-theme-preview">
              <ThemePresetPreview theme={config.theme} />
            </div>
            <div data-popover-html>
              <div className="theme-choices" />
            </div>
          </div>
        )} */}
        {config.requiresAuth && (
          <a
            className="block self-center"
            href="{{ .App.Config.Server.BaseURL }}/logout"
            title="Logout"
          >
            <svg
              className="logout-button"
              fill="none"
              stroke="var(--color-text-subdue)"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>logout</title>
              <path
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
