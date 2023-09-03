import React from "react";
import { Order } from "../../../generated/graphql";
import { ItemTable } from "./ItemTable";
import { parseDate } from "../utils/helpers";

type OrderDetailsProps = {
  order: Order;
};

export function OrderDetails(props: OrderDetailsProps) {
  return (
    <div className="store__order">
      <h3>Order {props.order.orderId}</h3>
      <p>Order time {parseDate(props.order.timestamp!)}</p>
      <ItemTable
        products={props.order.products!}
        totalSum={props.order.totalSum!}
      />
    </div>
  );
}
