import React from "react";
import { OrderedProduct } from "../../../generated/graphql";

type ItemTableProps = {
  products: OrderedProduct[];
  totalSum: number;
};

type OrderItemProps = {
  amount: number;
  name: string;
  price: number;
};

const OrderItem = (props: OrderItemProps) => (
  <tr>
    <td className="align-center">{props.amount}</td>
    <td>{props.name}</td>
    <td>{props.price} €</td>
  </tr>
);

export function ItemTable(props: ItemTableProps) {
  return (
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
  );
}
