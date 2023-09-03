import React from "react";
import { Order } from "../../../generated/graphql";
import { parseDate } from "../utils/helpers";

type OrderDetailsProps = {
  order: Order;
};

const OrderItem = (props: OrderItemProps) => (
  <tr>
    <td className="align-center">{props.amount}</td>
    <td>{props.name}</td>
    <td>{props.price} €</td>
  </tr>
);

export function OrderDetails(props: Partial<Order>) {
  return (
    <div className="store__order">
      <h3>Order {props.orderId}</h3>
      <p>Order time {parseDate(props.timestamp!)}</p>
      <table className="store__order__items">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.products!.map((product) => (
            <OrderItem
              key={product.product.ean}
              amount={product.amount}
              name={product.product.name}
              price={product.product.price}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th
              className="align-right"
              colSpan={2}>
              Total:
            </th>
            <td>{props.totalSum} €</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
