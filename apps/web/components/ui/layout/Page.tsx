import type { PageData } from "@glance/shared";
import type React from "react";
import { Column } from "./Column";

interface PageProps {
  page: PageData;
}

export const Page: React.FC<PageProps> = ({ page }) => {
  return (
    <div className={`grow content-bounds content-bounds-${page.width}`}>
      <main
        aria-busy="true"
        aria-live="polite"
        className={`page content-ready page-${page.slug}`}
        id="page"
      >
        <h1 className="visually-hidden">{page.title ?? page.slug}</h1>

        <div className="page-content">
          {/* Head widgets */}
          {page.headWidgets.length > 0 && (
            <div className="head-widgets">
              {page.headWidgets.map((widget) => (
                <div className="head-widget" key={widget.id}>
                  {/* TODO: Render widget component */}
                  <div className="widget-placeholder">
                    {widget.type} - {widget.title}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Main columns */}
          <div className="page-columns">
            {page.columns.map((column, index) => (
              <Column
                column={column}
                isPrimary={index === page.primaryColumnIndex}
                key={`column ${column.size} ${index}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
