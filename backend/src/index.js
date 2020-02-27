const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const graphQLHTTP = require("express-graphql");
const schema = require("./graphql/schema");

const app = express();

app.use(cors());

mongoose
  .connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.log(error, "something went wrong"));

app.get("/", (req, res) => {
  res.send("This is a GraphQL API. go to /graphql to use it");
});

app.use(
  "/graphql",
  graphQLHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log("Listening on port 4000"));
