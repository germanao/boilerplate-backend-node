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

export const getRandomID = (): number => {
  return Math.floor(Date.now() + Math.random());
};

interface SetupSwagger {
  customCss: string;
  customCssUrl: string;
}

export const setupSwagger = (): SetupSwagger => {
  return {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
  };
};
