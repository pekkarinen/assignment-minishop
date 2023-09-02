import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { OrderSummary } from "./components/OrderSummary";
import { gql } from "../../generated";

const ordersQuery = gql(`
  query getOrders($customerId: ID!) {
    orders(customerId: $customerId) {
      orderId
      customerId
      timestamp
      products {
        amount
        ean
      }
      totalSum
    }
  }`);

export function Orders() {
  const customerId = "customer-1";

  const { loading, data } = useQuery(ordersQuery, {
    variables: {
      customerId,
    },
  });

  return (
    <>
      <h1>My order history</h1>
      <Link
        className="store__button"
        to="/">
        Back to shop
      </Link>
      <h2>Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        data?.orders.map((order) => (
          <OrderSummary
            key={order.orderId}
            orderId={order.orderId}
            timestamp={order.timestamp}
            totalSum={order.totalSum}
          />
        ))
      )}
    </>
  );
}
