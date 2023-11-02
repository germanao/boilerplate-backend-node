Installation
npm:

Install npm: sudo apt install npm
Install the dependencies: npm install
yarn:

Install yarn: npm install -g yarn
Install the dependencies: yarn install
Usage
npm:

To start the API: npm start
To run the tests: npm test

yarn:

To start the API: yarn start
To run the tests: yarn test

Features
TypeScript support
Eslint and Prettier code formatting
Express framework for routing
Prisma ORM for database access
Jest for testing
Example
TypeScript
// api/controllers/index.ts

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

export default router;
Use o código com cuidado. Saiba mais
TypeScript
// api/routes/index.ts

import express from "express";

import controller from "../controllers/index";

const router = express.Router();

router.use("/", controller);

export default router;
Use o código com cuidado. Saiba mais
TypeScript
// api/index.ts

import express from "express";
import routes from "./routes";

const app = express();

app.use("/", routes);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
Use o código com cuidado. Saiba mais
Testing
To run the tests, simply execute the following command:

npm test
or

yarn test
Contributing
Feel free to contribute to this project by submitting pull requests. Please make sure to follow the code style guide and add tests for your changes.

License
This project is licensed under the MIT license.