import React from "react";
import { Product } from "../../../generated/graphql";

type ButtonProps = {
  text: string;
  clickHandler: Function;
};

type AddProductToOrderButtonProps = ButtonProps & {
  product: Product;
};

type OrderButtonProps = ButtonProps & {};

export function AddProductToOrderButton(props: AddProductToOrderButtonProps) {
  return (
    <button
      onClick={() => props.clickHandler(props.product)}
      className="store__button">
      {props.text}
    </button>
  );
}

export function OrderButton(props: OrderButtonProps) {
  return (
    <button
      onClick={() => props.clickHandler()}
      className="store__button">
      {props.text}
    </button>
  );
}
