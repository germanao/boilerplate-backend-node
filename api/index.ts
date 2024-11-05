/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import { routes } from "./routes";
import swaggerUi from "swagger-ui-express";
import { setupSwagger } from "./utils/utils";
import cors from "cors";
const allowedOrigins = ["http://localhost:6000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(options));
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use(
  "/swagger-ui",
  swaggerUi.serve,
  swaggerUi.setup(require("../openapi.json"), setupSwagger()),
);
app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

module.exports = app;
