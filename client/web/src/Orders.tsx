import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { OrderSummary } from "./components/OrderSummary";
import { Header } from "./components/Header";
import { gql } from "../../generated";

export const ordersQuery = gql(`
  query getOrders($customerId: ID!) {
    orders(customerId: $customerId) {
      orderId
      customerId
      timestamp
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

  const displayData = () => {
    if (!data || !data.orders) {
      return <p>No orders</p>;
    }
    return data.orders.map((order) => (
      <OrderSummary
        key={order.orderId}
        orderId={order.orderId}
        timestamp={order.timestamp}
        totalSum={order.totalSum}
      />
    ));
  };

  return (
    <>
      <Header text="My order history" />
      <Link
        className="store__button"
        to="/">
        Back to shop
      </Link>
      <h2>Orders</h2>
      {loading ? <p>Loading orders...</p> : displayData()}
    </>
  );
}
