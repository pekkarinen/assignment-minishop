import React from "react";
import { Link, useParams } from "react-router-dom";
import { gql } from "../../generated";
import { Order } from "../../generated/graphql";
import { useQuery } from "@apollo/client";

const orderQuery = gql(`
  query getOrder($orderId: ID!, $customerId: ID!) {
    order(orderId: $orderId, customerId: $customerId) {
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

export function Order() {
  const { orderId } = useParams();
  const customerId = "customer-1";
  const { loading, data } = useQuery(orderQuery, {
    variables: {
      orderId: orderId ?? "",
      customerId,
    },
  });

  return (
    <>
      <h1>Order summary</h1>
      <Link
        className="store__button"
        to="/orders">
        Back to My Orders
      </Link>
      {loading ? (
        <p>Loading orders...</p>
      ) : data ? (
        <OrderSummary
          key={data.order.orderId}
          orderId={data.order.orderId}
          timestamp={data.order.timestamp}
          totalSum={data.order.totalSum}
        />
      ) : (
        <p>No such order</p>
      )}
    </>
  );
}

function OrderSummary(props: Partial<Order>) {
  return (
    <div>
      <h3>Order: {props.orderId}</h3>
      <p>Order time {props.timestamp}</p>
      <p>Total: {props.totalSum} €</p>
    </div>
  );
}
