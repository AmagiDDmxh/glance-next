import type { WidgetType } from "@glance/shared";
import React from "react";
import MarketsWidget from "../widgets/MarketsWidget";
import RedditWidget from "../widgets/RedditWidget";
import RSSWidget from "../widgets/RSSWidget";
import WeatherWidget from "../widgets/weather/WeatherWidget";

const widgetComponents: Record<WidgetType, React.ComponentType<any>> = {
  rss: RSSWidget,
  reddit: RedditWidget,
  weather: WeatherWidget,
  markets: MarketsWidget,
  videos: () =>
    React.createElement("div", null, "Videos Widget (Not implemented)"),
  "twitch-channels": () =>
    React.createElement(
      "div",
      null,
      "Twitch Channels Widget (Not implemented)"
    ),
  "twitch-top-games": () =>
    React.createElement(
      "div",
      null,
      "Twitch Top Games Widget (Not implemented)"
    ),
  "docker-containers": () =>
    React.createElement(
      "div",
      null,
      "Docker Containers Widget (Not implemented)"
    ),
  "server-stats": () =>
    React.createElement("div", null, "Server Stats Widget (Not implemented)"),
  calendar: () =>
    React.createElement("div", null, "Calendar Widget (Not implemented)"),
  clock: () =>
    React.createElement("div", null, "Clock Widget (Not implemented)"),
  bookmarks: () =>
    React.createElement("div", null, "Bookmarks Widget (Not implemented)"),
  "to-do": () =>
    React.createElement("div", null, "Todo Widget (Not implemented)"),
  group: () =>
    React.createElement("div", null, "Group Widget (Not implemented)"),
  "custom-api": () =>
    React.createElement("div", null, "Custom API Widget (Not implemented)"),
  iframe: () =>
    React.createElement("div", null, "Iframe Widget (Not implemented)"),
  html: () => React.createElement("div", null, "HTML Widget (Not implemented)"),
  search: () =>
    React.createElement("div", null, "Search Widget (Not implemented)"),
  monitor: () =>
    React.createElement("div", null, "Monitor Widget (Not implemented)"),
  releases: () =>
    React.createElement("div", null, "Releases Widget (Not implemented)"),
  repository: () =>
    React.createElement("div", null, "Repository Widget (Not implemented)"),
  "hacker-news": () =>
    React.createElement("div", null, "Hacker News Widget (Not implemented)"),
  lobsters: () =>
    React.createElement("div", null, "Lobsters Widget (Not implemented)"),
  "change-detection": () =>
    React.createElement(
      "div",
      null,
      "Change Detection Widget (Not implemented)"
    ),
  "dns-stats": () =>
    React.createElement("div", null, "DNS Stats Widget (Not implemented)"),
  "split-column": () =>
    React.createElement("div", null, "Split Column Widget (Not implemented)"),
};

export function getWidgetComponent(type: WidgetType): React.ComponentType<any> {
  return (
    widgetComponents[type] ||
    (() => React.createElement("div", null, `Unknown widget type: ${type}`))
  );
}
