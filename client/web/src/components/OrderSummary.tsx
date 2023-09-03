import React from "react";
import { Link } from "react-router-dom";
import { Order } from "../../../generated/graphql";
import { parseDate } from "../utils/helpers";

export function OrderSummary(props: Partial<Order>) {
  return (
    <div className="store__order">
      <header className="store__order__header">
        <h3>Order {props.orderId}</h3>
      </header>
      <p>
        <strong>Order time</strong> {parseDate(props.timestamp!)}
      </p>
      <p>
        <strong>Total:</strong> {props.totalSum} €
      </p>
      <Link
        className="store__button"
        to={`/orders/${props.orderId}`}>
        View order
      </Link>
    </div>
  );
}
