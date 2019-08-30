const chalk = require("chalk");
const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./graphql/schema");
const config = require("../../secret");
const PORT = 3000;

const app = express();
// Replace with your mongoLab URI

const MONGO_URI = config.MONGO_URL;

if (!MONGO_URI) {
  console.log(MONGO_URI);
  throw new Error("You must provide a MongoLab URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  const log = console.log;
  log("\n");
  log(chalk.bgGreen.black(`Server listening on http://localhost:${PORT}/ ..`));
});

export default app;
