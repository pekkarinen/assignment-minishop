import React from "react";
import { Button } from "./UI";

type Props = {
  name: string;
  ean: string;
  price: number;
};

export function ProductCard(props: Props) {
  function addToOrder(product) {}

  return (
    <div className="store__products-list__product">
      <h3>{props.name}</h3>
      <p>{props.ean}</p>
      <p>{props.price} €</p>
      <Button
        text="Add to order"
        onclick={addToOrder(props)}
      />
    </div>
  );
}
