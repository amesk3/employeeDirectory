import express from "express";
import path from "path";
import chalk from "chalk";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";

import schema from "./graphql/schema";
import config from "./config";
import models from "./graphql/models";
import mongoose from "mongoose";

const app = express();

const MONGO_URI = config.MONGO_URL;
if (!MONGO_URI) {
  throw new Error("You must provide a MongoLab URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI), { useNewUrlParser: true };
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

app.use("/", express.static(path.resolve(__dirname, "/../public")));

app.get("/", (req, res) => {
  res.send({
    message: "I am a server route and can also be hot reloaded!"
  });
});

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema
  })
);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.listen(config.PORT, () => {
  const log = console.log;
  log("\n");
  log(
    chalk.bgGreen.black(
      `Server listening on http://localhost:${config.PORT}/ ..`
    )
  );
  log("\n");

  log(`${chalk.blue("/graphql")}  - endpoint for queries`);
  log(`${chalk.blue("/graphiql")} - endpoint for testing`);
  log("\n");
});

export default app;
