import { type Express } from "express-serve-static-core";
import type path from "path";

export const handleDynamicRoute = (
  routesDir: string,
  file: string,
  path: path.PlatformPath,
  express: Express,
): void => {
  if (file.endsWith(".ts")) {
    const routePath = path.join(routesDir, file);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const router = require(routePath).default;
    const routeName = file.split(".")[0];
    express.use(`/api/${routeName}`, router);
  }
};
