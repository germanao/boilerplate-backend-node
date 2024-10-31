import express from "express";
import { routes } from "./routes";
import { TspecDocsMiddleware } from "tspec";

const initServer = async (): Promise<void> => {
  const app = express();

  app.use((req, res, next) => {
    next();
  });

  app.use("/api", routes);
  app.use("/docs", await TspecDocsMiddleware());

  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
};

void initServer();
