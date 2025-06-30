import type { RedditWidget as RedditWidgetType } from "@glance/shared";
import type React from "react";
import { WidgetContainer } from "../index";

interface RedditWidgetProps {
  widget: RedditWidgetType;
  data?: any;
  loading?: boolean;
  error?: string;
}

const RedditWidget: React.FC<RedditWidgetProps> = ({
  widget,
  data,
  loading,
  error,
}) => {
  return (
    <WidgetContainer error={error} loading={loading} widget={widget}>
      <div className="reddit-widget-content">
        {data?.posts?.map((post: any, index: number) => (
          <div className="reddit-post" key={index}>
            <a href={post.url} rel="noopener noreferrer" target="_blank">
              <h4>{post.title}</h4>
              <div className="post-meta">
                <span>by {post.author}</span>
                <span>↑ {post.score}</span>
                <span>💬 {post.comments}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
};

export default RedditWidget;
