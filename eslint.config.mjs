import next from "eslint-config-next/core-web-vitals";
import { defineConfig } from "eslint/config";
export default defineConfig([
  { ignores: [".next/**", "next-env.d.ts", "apk-build/**"] },
  ...next,
]);
