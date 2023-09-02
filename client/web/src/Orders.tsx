import React from "react";
import { Link, useParams } from "react-router-dom";
import { gql } from "../../generated";
import { Order } from "../../generated/graphql";
import { useQuery } from "@apollo/client";

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
  // TODO implement
  const { orderId } = useParams();

  const { loading, data } = useQuery(ordersQuery, {
    variables: { customerId: "customer-1" },
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

function OrderSummary(props: Partial<Order>) {
  return (
    <div>
      <h3>Order</h3>
      <p>Order time {props.timestamp}</p>
      <p>Total: {props.totalSum} €</p>
      <Link
        className="store__button"
        to={`/orders/${props.orderId}`}>
        View order
      </Link>
    </div>
  );
}
