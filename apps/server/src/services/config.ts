import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { GlanceConfig } from "@glance/shared";
import yaml from "js-yaml";

let cachedConfig: GlanceConfig | null = null;

export function loadConfig(): GlanceConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const configPath =
      process.env.CONFIG_PATH || join(process.cwd(), "config", "glance.yml");
    const configFile = readFileSync(configPath, "utf8");

    // Parse YAML and handle environment variables
    const parsedConfig = yaml.load(configFile) as GlanceConfig;

    // Process environment variables in the config
    const processedConfig = processConfigVariables(parsedConfig);

    cachedConfig = processedConfig as GlanceConfig;
    return cachedConfig;
  } catch (error) {
    console.error("Failed to load configuration:", error);
    throw new Error("Configuration file not found or invalid");
  }
}

function processConfigVariables(config: any): any {
  if (typeof config === "string") {
    return processStringVariables(config);
  }
  if (Array.isArray(config)) {
    return config.map(processConfigVariables);
  }
  if (typeof config === "object" && config !== null) {
    const processed: Partial<GlanceConfig> = {};
    for (const [key, value] of Object.entries(config)) {
      const camelKey = camelize(key) as keyof GlanceConfig;
      processed[camelKey] = processConfigVariables(value);
    }
    return processed as GlanceConfig;
  }
  return config;
}

function camelize(str: string) {
  return str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());
}

function processStringVariables(str: string): string {
  return str.replace(/\$\{([^}]+)\}/g, (match, variable) => {
    const value = process.env[variable];
    if (value === undefined) {
      console.warn(`Environment variable ${variable} not found`);
      return match;
    }
    return value;
  });
}

export function clearConfigCache(): void {
  cachedConfig = null;
}
