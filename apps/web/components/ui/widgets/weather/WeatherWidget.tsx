"use client";

import type { WeatherWidget as WeatherWidgetType } from "@glance/shared";
import type React from "react";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { WidgetContainer } from "../../index";
import {
  fetchWeatherData,
  type OpenMeteoPlace,
  type WeatherData,
} from "./weatherData";

interface WeatherWidgetProps {
  widget: WeatherWidgetType;
  data?: { weather: WeatherData; place: OpenMeteoPlace };
  loading?: boolean;
  error?: string;
}

const timeLabels12h = [
  "2am",
  "4am",
  "6am",
  "8am",
  "10am",
  "12pm",
  "2pm",
  "4pm",
  "6pm",
  "8pm",
  "10pm",
  "12am",
];
const timeLabels24h = [
  "02:00",
  "04:00",
  "06:00",
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "20:00",
  "22:00",
  "00:00",
];

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  widget,
  data: propData,
  loading: propLoading,
  error: propError,
}) => {
  // Use SWR for data fetching if no data is provided via props
  const { data, error, isLoading } = useSWR(
    propData ? null : `weather-${widget.location}-${widget.units}`,
    () => fetchWeatherData(widget),
    {
      refreshInterval: 300_000, // Refresh every 5 minutes
      errorRetryCount: 3,
    }
  );
  const timeLabels =
    (!widget.hourFormat && widget.hourFormat === "") ||
    widget.hourFormat === "12h"
      ? timeLabels12h
      : timeLabels24h;

  // Use props data if available, otherwise use SWR data
  const weatherData = propData?.weather || data?.weather;
  const place = propData?.place || data?.place;
  const loading = propLoading || isLoading;
  const errorMessage = propError || (error ? error.message : undefined);

  return (
    <WidgetContainer error={errorMessage} loading={loading} widget={widget}>
      <div className="widget-small-content-bounds">
        <div className="color-highlight size-h2 text-center">
          {weatherData?.weatherCodeAsString}
        </div>
        <div className="size-h4 text-center">
          Feels like {weatherData?.apparentTemperature}°
          {widget.units === "metric" ? "C" : "F"}
        </div>

        <div className="weather-columns margin-top-15 flex justify-center">
          {weatherData?.columns.map((x, idx) => (
            <div
              className={`weather-column ${
                idx === weatherData.currentColumn && "weather-column-current"
              }`}
              key={`column ${x.temperature} ${idx}`}
            >
              {/* If has precipitation */}
              {x.hasPrecipitation && <div className="weather-column-rain" />}
              {/* If in daylight, sunrise, sunset */}
              {idx >= weatherData.sunriseColumn &&
                idx <= weatherData.sunsetColumn && (
                  <div
                    className={cn(
                      "weather-column-daylight",
                      idx === weatherData.sunriseColumn &&
                        "weather-column-daylight-sunrise",
                      idx === weatherData.sunsetColumn &&
                        "weather-column-daylight-sunset"
                    )}
                  />
                )}
              {/* Value, negative if needed */}
              <div
                className={cn(
                  "weather-column-value",
                  x.temperature < 0 && "weather-column-value-negative"
                )}
              >
                {Number.parseInt(Math.abs(x.temperature).toString(), 10)}
              </div>
              {/* Bar with height/scale */}
              <div
                className="weather-bar"
                style={{
                  // @ts-expect-error
                  "--weather-bar-height": x.scale.toFixed(2),
                }}
              />
              {/* Time label */}
              <div className="weather-column-time">{timeLabels[idx]}</div>
            </div>
          ))}
        </div>

        {/* If not hideLocation */}
        {!widget.hideLocation && (
          <div className="margin-top-15 flex size-h5 items-center justify-center gap-7">
            <div className="location-icon" />
            <div className="text-truncate">
              {place?.name} {widget.showAreaName && place?.area}{" "}
              {place?.country}
            </div>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

export default WeatherWidget;
