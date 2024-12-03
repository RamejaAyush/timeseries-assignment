import { build } from "esbuild";

build({
  entryPoints: ["src/server.ts"],
  bundle: true,
  platform: "node",
  outdir: "dist",
  target: "es6",
  sourcemap: true,
  tsconfig: "./tsconfig.json",
  external: ["dotenv", "express"],
}).catch(() => process.exit(1));
