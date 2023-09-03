import React from "react";
import { Link } from "react-router-dom";
import { Order } from "../../../generated/graphql";
import { parseDate } from "../utils/helpers";

export function OrderDetails(props: Partial<Order>) {
  return (
    <div>
      <h3>Order</h3>
      <p>Order time {parseDate(props.timestamp!)}</p>
      <p>Total: {props.totalSum} €</p>
      <Link
        className="store__button"
        to={`/orders/${props.orderId}`}>
        View order
      </Link>
    </div>
  );
}
