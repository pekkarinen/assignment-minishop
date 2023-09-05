import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { Orders } from "./Orders";
import { Order } from "./Order";
import { Store } from "./Store";
import { UserContext } from "./UserContext";

const gqlClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

loadDevMessages();
loadErrorMessages();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Store />,
  },
  {
    path: "orders/",
    element: <Orders />,
  },
  {
    path: "orders/:orderId",
    element: <Order />,
  },
]);

const container = document.getElementById("app");

const root = createRoot(container!);
root.render(
  <ApolloProvider client={gqlClient}>
    <UserContext.Provider value="customer-1">
      <RouterProvider router={router} />
    </UserContext.Provider>
  </ApolloProvider>
);
