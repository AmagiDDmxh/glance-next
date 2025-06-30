import type { ThemeConfig } from "@glance/shared";
import type React from "react";
import { hslString } from "@/lib/utils";

interface ThemePresetPreviewProps {
  theme: ThemeConfig;
}

export const ThemePresetPreview: React.FC<ThemePresetPreviewProps> = ({
  theme,
}) => {
  const { background, negative, positive, primary } = extractTheme(theme);

  return (
    <button
      className={`theme-preset ${theme.light ? " theme-preset-light" : ""}`}
      data-key={theme.key ?? "NO_KEY"}
      style={{ "--color": background } as React.CSSProperties}
      type="button"
    >
      <div
        className="theme-color"
        style={{ "--color": primary } as React.CSSProperties}
      />
      <div
        className="theme-color"
        style={{ "--color": positive } as React.CSSProperties}
      />
      <div
        className="theme-color"
        style={{ "--color": negative } as React.CSSProperties}
      />
    </button>
  );
};

function extractTheme({
  backgroundColor,
  primaryColor,
  positiveColor,
  negativeColor,
}: ThemeConfig) {
  const background = backgroundColor || "hsl(240, 8%, 9%)";
  const primary = primaryColor || "hsl(43, 50%, 70%)";
  const positive = primaryColor
    ? positiveColor ?? primary
    : "hsl(43, 50%, 70%)";
  const negative = negativeColor || "hsl(0, 70%, 70%)";

  return {
    background: hslString(background),
    primary: hslString(primary),
    positive: hslString(positive),
    negative: hslString(negative),
  };
}
