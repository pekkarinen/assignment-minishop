import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { OrderSummary } from "./components/OrderSummary";
import { Header } from "./components/Header";
import { UserContext } from "./UserContext";
import { ordersQuery } from "./graphql/queries";

export function Orders() {
  const customerId = useContext(UserContext);
  console.log(customerId);
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
