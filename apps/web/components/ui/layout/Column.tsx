import type { ColumnData, WidgetType } from "@glance/shared";
import type React from "react";
import { cn } from "@/lib/utils";
import { getWidgetComponent } from "../utils/widgetRegistry";

interface ColumnProps {
  column: ColumnData;
  isPrimary?: boolean;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  isPrimary = false,
}) => {
  return (
    <div
      className={cn(
        `page-column page-column-${column.size}`,
        isPrimary && "primary-column"
      )}
    >
      {column.widgets.map((widget, widx) => {
        const WidgetComponent = getWidgetComponent(widget.type as WidgetType);
        return (
          <WidgetComponent
            key={`${widget.id ?? widget.title} ${widx}`}
            widget={widget}
          />
        );
      })}
    </div>
  );
};
