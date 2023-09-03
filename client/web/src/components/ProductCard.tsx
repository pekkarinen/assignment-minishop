import React from "react";
import { Button } from "./UI";

type Props = {
  name: string;
  ean: string;
  imageUrl: string;
  price: number;
};

export function ProductCard(props: Props) {
  return (
    <div className="store__products-list__product">
      <img
        className="store__products-list__product__image"
        alt={props.name}
        src={props.imageUrl}
      />
      <h3>{props.name}</h3>
      <p className="small">{props.ean}</p>
      <div className="store__products-list__product__price">{props.price} €</div>
      <Button text="Add to order" />
    </div>
  );
}
