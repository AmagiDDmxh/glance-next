import type { MarketsWidget as MarketsWidgetType } from "@glance/shared";
import type React from "react";
import { WidgetContainer } from "../index";

interface MarketsWidgetProps {
  widget: MarketsWidgetType;
  data?: any;
  loading?: boolean;
  error?: string;
}

const MarketsWidget: React.FC<MarketsWidgetProps> = ({
  widget,
  data,
  loading,
  error,
}) => {
  return (
    <WidgetContainer error={error} loading={loading} widget={widget}>
      <div className="markets-widget-content">
        {data?.markets?.map((market: any, index: number) => (
          <div className="market-item" key={index}>
            <div className="market-symbol">{market.symbol}</div>
            <div className="market-name">{market.name}</div>
            <div
              className={`market-price ${
                market.change >= 0 ? "positive" : "negative"
              }`}
            >
              ${market.price.toFixed(2)}
            </div>
            <div
              className={`market-change ${
                market.change >= 0 ? "positive" : "negative"
              }`}
            >
              {market.change >= 0 ? "+" : ""}
              {market.change.toFixed(2)} ({market.changePercent.toFixed(2)}%)
            </div>
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
};

export default MarketsWidget;
