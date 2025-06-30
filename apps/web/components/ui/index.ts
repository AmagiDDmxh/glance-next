// Widget components

export { default as MarketsWidget } from "./widgets/MarketsWidget";
export { default as RedditWidget } from "./widgets/RedditWidget";
export { default as RSSWidget } from "./widgets/RSSWidget";
export { default as WeatherWidget } from "./widgets/weather/WeatherWidget";

// export { default as VideosWidget } from './widgets/VideosWidget';
// export { default as TwitchChannelsWidget } from './widgets/TwitchChannelsWidget';
// export { default as TwitchTopGamesWidget } from './widgets/TwitchTopGamesWidget';
// export { default as DockerContainersWidget } from './widgets/DockerContainersWidget';
// export { default as ServerStatsWidget } from './widgets/ServerStatsWidget';
// export { default as CalendarWidget } from './widgets/CalendarWidget';
// export { default as ClockWidget } from './widgets/ClockWidget';
// export { default as BookmarksWidget } from './widgets/BookmarksWidget';
// export { default as TodoWidget } from './widgets/TodoWidget';
// export { default as GroupWidget } from './widgets/GroupWidget';
// export { default as CustomAPIWidget } from './widgets/CustomAPIWidget';
// export { default as IframeWidget } from './widgets/IframeWidget';
// export { default as HTMLWidget } from './widgets/HTMLWidget';
// export { default as SearchWidget } from './widgets/SearchWidget';
// export { default as MonitorWidget } from './widgets/MonitorWidget';
// export { default as ReleasesWidget } from './widgets/ReleasesWidget';
// export { default as RepositoryWidget } from './widgets/RepositoryWidget';
// export { default as HackerNewsWidget } from './widgets/HackerNewsWidget';
// export { default as LobstersWidget } from './widgets/LobstersWidget';
// export { default as ChangeDetectionWidget } from './widgets/ChangeDetectionWidget';
// export { default as DNSStatsWidget } from './widgets/DNSStatsWidget';
// export { default as SplitColumnWidget } from './widgets/SplitColumnWidget';

export { default as ErrorMessage } from "./common/ErrorMessage";
export { default as LoadingSpinner } from "./common/LoadingSpinner";
export { default as NoticeMessage } from "./common/NoticeMessage";

// Common components
export { default as WidgetHeader } from "./common/WidgetHeader";
export { useTheme } from "./hooks/useTheme";
// Hooks
export { useWidgetData } from "./hooks/useWidgetData";
export { Column } from "./layout/Column";
// Layout components
export { Page } from "./layout/Page";
export { WidgetContainer } from "./layout/WidgetContainer";

// Utilities
export { getWidgetComponent } from "./utils/widgetRegistry";
