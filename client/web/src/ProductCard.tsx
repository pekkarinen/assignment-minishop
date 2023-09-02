import React from "react";

type Props = {
  name: string;
  ean: string;
  price: number;
};

export function ProductCard(props: Props) {
  return (
    <div className="store__product">
      <h3>{props.name}</h3>
      <p>{props.ean}</p>
      <p>{props.price} €</p>
    </div>
  );
}
