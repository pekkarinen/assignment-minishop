import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { OrderDetails } from "./components/OrderDetails";
import { Header } from "./components/Header";
import { UserContext } from "./UserContext";
import { orderQuery } from "./graphql/queries";

export function Order() {
  const { orderId } = useParams();
  const customerId = useContext(UserContext);
  const { loading, data } = useQuery(orderQuery, {
    variables: {
      orderId: orderId!,
      customerId,
    },
  });

  const displayData = () => {
    if (!data || !data.order) {
      return <p>No such order!</p>;
    }

    return (
      <OrderDetails
        key={data.order.orderId}
        order={data.order}
      />
    );
  };

  return (
    <>
      <Header text="Order summary" />
      <Link
        className="store__button"
        to="/orders">
        Back to My Orders
      </Link>
      {loading ? <p>Loading orders...</p> : displayData()}
    </>
  );
}
