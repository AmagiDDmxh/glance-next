// Configuration types
export interface GlanceConfig {
  server: ServerConfig;
  auth: AuthConfig;
  document: DocumentConfig;
  theme: ThemeConfig;
  branding: BrandingConfig;
  pages: Page[];
  requiresAuth?: boolean;
}

export interface ServerConfig {
  host: string;
  port: number;
  proxied: boolean;
  assetsPath: string;
  baseURL: string;
}

export interface AuthConfig {
  secretKey: string;
  users: Record<string, User>;
}

export interface User {
  password?: string;
  passwordHash?: string;
}

export interface DocumentConfig {
  head: string;
}

export interface ThemeConfig {
  // Theme properties
  light?: boolean;
  backgroundColor?: HSLColor;
  primaryColor?: HSLColor;
  negativeColor?: HSLColor;
  positiveColor?: HSLColor;
  contrastMultiplier?: number;
  textSaturationMultiplier?: number;

  // Theme configuration
  customCSSFile?: string;
  disablePicker?: boolean;
  presets?: Record<string, ThemeProperties>;
  key?: string;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface ThemeProperties {
  light?: boolean;
  backgroundColor?: HSLColor;
  primaryColor?: HSLColor;
  negativeColor?: HSLColor;
  contrastMultiplier?: number;
  textSaturationMultiplier?: number;
  key?: string;
}

export interface BrandingConfig {
  hideFooter?: boolean;
  customFooter?: string;
  logoText?: string;
  logoURL?: string;
  faviconURL?: string;
  faviconType?: string;
  appName?: string;
  appIconURL?: string;
  appBackgroundColor?: string;
}

export interface Page {
  title: string;
  slug?: string;
  width?: string;
  desktopNavigationWidth?: string;
  showMobileHeader?: boolean;
  hideDesktopNavigation?: boolean;
  centerVertically?: boolean;
  headWidgets: Widget[];
  columns: Column[];
  primaryColumnIndex?: number;
}

export interface Column {
  size: string;
  widgets: Widget[];
}

// Widget types
export interface Widget {
  id: number;
  type: string;
  title?: string;
  titleURL?: string;
  hideHeader?: boolean;
  cssClass?: string;
  cache?: string;
  contentAvailable?: boolean;
  wip?: boolean;
  error?: string;
  notice?: string;
}

// Specific widget types
export interface RSSWidget extends Widget {
  type: "rss";
  limit?: number;
  collapseAfter?: number;
  feeds: RSSFeed[];
}

export interface RSSFeed {
  url: string;
  title?: string;
  limit?: number;
}

export interface RedditWidget extends Widget {
  type: "reddit";
  subreddit: string;
  showThumbnails?: boolean;
  limit?: number;
}

export interface WeatherWidget extends Widget {
  type: "weather";
  location: string;
  units?: "metric" | "imperial";
  hourFormat?: "12h" | "24h";
  showAreaName?: boolean;
  hideLocation?: boolean;
}

export interface MarketsWidget extends Widget {
  type: "markets";
  markets: Market[];
}

export interface Market {
  symbol: string;
  name: string;
}

export interface VideosWidget extends Widget {
  type: "videos";
  channels: string[];
  style?: "grid" | "vertical-list";
}

export interface TwitchChannelsWidget extends Widget {
  type: "twitch-channels";
  channels: string[];
}

export interface TwitchTopGamesWidget extends Widget {
  type: "twitch-top-games";
  limit?: number;
}

export interface DockerContainersWidget extends Widget {
  type: "docker-containers";
  host?: string;
  containers?: string[];
}

export interface ServerStatsWidget extends Widget {
  type: "server-stats";
  showCPU?: boolean;
  showMemory?: boolean;
  showDisk?: boolean;
  showNetwork?: boolean;
}

export interface CalendarWidget extends Widget {
  type: "calendar";
  firstDayOfWeek?: "monday" | "sunday";
}

export interface ClockWidget extends Widget {
  type: "clock";
  format?: string;
  timezone?: string;
}

export interface BookmarksWidget extends Widget {
  type: "bookmarks";
  bookmarks: Bookmark[];
}

export interface Bookmark {
  title: string;
  url: string;
  icon?: string;
}

export interface TodoWidget extends Widget {
  type: "to-do";
  items: TodoItem[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface GroupWidget extends Widget {
  type: "group";
  widgets: Widget[];
}

export interface CustomAPIWidget extends Widget {
  type: "custom-api";
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: string;
  cache?: string;
}

export interface IframeWidget extends Widget {
  type: "iframe";
  url: string;
  height?: string;
}

export interface HTMLWidget extends Widget {
  type: "html";
  content: string;
}

export interface SearchWidget extends Widget {
  type: "search";
  engine?: string;
  placeholder?: string;
}

export interface MonitorWidget extends Widget {
  type: "monitor";
  url: string;
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: string;
  expectedStatus?: number;
  timeout?: number;
}

export interface ReleasesWidget extends Widget {
  type: "releases";
  repositories: string[];
  cache?: string;
}

export interface RepositoryWidget extends Widget {
  type: "repository";
  repository: string;
  platform?: "github" | "gitlab" | "codeberg";
}

export interface HackerNewsWidget extends Widget {
  type: "hacker-news";
  limit?: number;
}

export interface LobstersWidget extends Widget {
  type: "lobsters";
  limit?: number;
}

export interface ChangeDetectionWidget extends Widget {
  type: "change-detection";
  url: string;
  selector?: string;
  cache?: string;
}

export interface DNSStatsWidget extends Widget {
  type: "dns-stats";
  domain: string;
  recordType?: string;
}

export interface SplitColumnWidget extends Widget {
  type: "split-column";
  columns: number;
  layout?: "masonry" | "grid";
  widgets: Widget[];
}

// API Response types
export interface WidgetData {
  id: number;
  type: string;
  title?: string;
  titleURL?: string;
  hideHeader?: boolean;
  cssClass?: string;
  content: string;
  contentAvailable: boolean;
  wip?: boolean;
  error?: string;
  notice?: string;
  lastUpdated?: string;
}

export interface PageData {
  name?: string;
  title?: string;
  slug: string;
  width?: string;
  desktopNavigationWidth?: string;
  showMobileHeader?: boolean;
  hideDesktopNavigation?: boolean;
  centerVertically?: boolean;
  headWidgets: WidgetData[];
  columns: ColumnData[];
  primaryColumnIndex?: number;
}

export interface ColumnData {
  size: string;
  widgets: WidgetData[];
}

// Utility types
export type WidgetType =
  | "rss"
  | "reddit"
  | "weather"
  | "markets"
  | "videos"
  | "twitch-channels"
  | "twitch-top-games"
  | "docker-containers"
  | "server-stats"
  | "calendar"
  | "clock"
  | "bookmarks"
  | "to-do"
  | "group"
  | "custom-api"
  | "iframe"
  | "html"
  | "search"
  | "monitor"
  | "releases"
  | "repository"
  | "hacker-news"
  | "lobsters"
  | "change-detection"
  | "dns-stats"
  | "split-column";

export type ColumnSize = "small" | "medium" | "full";
