import type { Widget } from "@glance/shared";

interface WidgetHeaderProps {
  widget: Widget;
}

export const WidgetHeader: React.FC<WidgetHeaderProps> = ({ widget }) => {
  if (widget.hideHeader) {
    return null;
  }

  const title = widget.title ?? `${widget.type[0]}${widget.type.slice(1)}`;

  return (
    <div className="widget-header">
      <h3 className="uppercase">
        {widget.titleURL ? (
          <a href={widget.titleURL} rel="noopener noreferrer" target="_blank">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
    </div>
  );
};

export default WidgetHeader;
