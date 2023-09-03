import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "../../generated";
import { OrderDetails } from "./components/OrderDetails";

const orderQuery = gql(`
  query getOrder($orderId: ID!, $customerId: ID!) {
    order(orderId: $orderId, customerId: $customerId) {
      orderId
      customerId
      timestamp
      products {
        product {
          name
          price
          ean
          imageUrl
        }
        amount
      }
      totalSum
    }
  }`);

export function Order() {
  const { orderId } = useParams();
  const customerId = "customer-1";
  const { loading, data } = useQuery(orderQuery, {
    variables: {
      orderId: orderId!,
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
      ) : data?.order ? (
        <OrderDetails
          key={data.order.orderId}
          orderId={data.order.orderId}
          products={data.order.products}
          timestamp={data.order.timestamp}
          totalSum={data.order.totalSum}
        />
      ) : (
        <p>No such order</p>
      )}
    </>
  );
}
