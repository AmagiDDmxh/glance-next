import type { Widget } from "@glance/shared";
import type React from "react";
import {
  ErrorMessage,
  LoadingSpinner,
  NoticeMessage,
  WidgetHeader,
} from "../common";

interface WidgetContainerProps {
  widget: Widget;
  children?: React.ReactNode;
  loading?: boolean;
  error?: string;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  widget,
  children,
  loading,
  error,
}) => {
  return (
    <div className={`widget widget-${widget.type} ${widget.cssClass || ""}`}>
      <WidgetHeader widget={widget} />

      {widget.notice && <NoticeMessage message={widget.notice} />}
      {widget.error && <ErrorMessage message={widget.error} />}
      {error && <ErrorMessage message={error} />}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="widget-content">{children}</div>
      )}
    </div>
  );
};
