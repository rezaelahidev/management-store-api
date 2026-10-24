import React from "react";
import { createRoot } from "react-dom/client";
import { GraphiQL } from "graphiql";
import { createGraphiQLFetcher } from "@graphiql/toolkit";

import "graphiql/style.css";

const fetcher = createGraphiQLFetcher({
  url: "/graphql",
});

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <GraphiQL fetcher={fetcher} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);