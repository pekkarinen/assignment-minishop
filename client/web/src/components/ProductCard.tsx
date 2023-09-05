import React from "react";
import { Product } from "../../../generated/graphql";
import { AddProductToOrderButton } from "./UI";

type Props = {
  product: Product;
  clickHandler: Function;
};

export function ProductCard(props: Props) {
  return (
    <div className="store__products-list__product">
      <img
        className="store__products-list__product__image"
        alt={props.product.name}
        src={props.product.imageUrl}
      />
      <div className="store__products-list__product__details">
        <h3>{props.product.name}</h3>
        <p className="small">{props.product.ean}</p>
        <div className="store__products-list__product__price">{props.product.price} €</div>
        <AddProductToOrderButton
          text="Add to order"
          product={props.product}
          clickHandler={props.clickHandler}
        />
      </div>
    </div>
  );
}
