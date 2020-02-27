import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Login from "./routes/login";
import Application from "./routes/application";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

export default function(props) {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/app" component={Application} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}
