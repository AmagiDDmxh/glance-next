import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets-zod";
import { z } from "zod";

export const env = createEnv({
  shared: {
    PORT: z.coerce.number().default(3000),
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
    NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX: z.string().optional(),
  },

  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app isn't
   * built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    VERCEL_ENV: z
      .enum(["development", "preview", "production"])
      .default("development"),
  },

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SERVER_URL: z.string().min(1),
  },

  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    PORT: process.env.PORT,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX:
      process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
  extends: [vercel()],
});

export const isProd =
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL_ENV === "production";
export const isDev = !isProd;
