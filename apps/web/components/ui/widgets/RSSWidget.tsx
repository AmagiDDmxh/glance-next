import type { RSSWidget as RSSWidgetType } from "@glance/shared";
import type React from "react";
import { WidgetContainer } from "../index";

interface RSSWidgetProps {
  widget: RSSWidgetType;
  data?: any;
  loading?: boolean;
  error?: string;
}

const RSSWidget: React.FC<RSSWidgetProps> = ({
  widget,
  data,
  loading,
  error,
}) => {
  return (
    <WidgetContainer error={error} loading={loading} widget={widget}>
      <div className="rss-widget-content">
        {data?.items?.map((item: any, index: number) => (
          <div className="rss-item" key={index}>
            <a href={item.link} rel="noopener noreferrer" target="_blank">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <small>{new Date(item.pubDate).toLocaleDateString()}</small>
            </a>
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
};

export default RSSWidget;
