import React from "react";
import { Product } from "../../../generated/graphql";

type ButtonProps = {
  text: string;
  clickHandler: Function;
  disabled?: boolean;
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

export function EmptyBasketButton(props: OrderButtonProps) {
  return (
    <button
      onClick={() => props.clickHandler()}
      className="store__button"
      disabled={props.disabled}
      style={{ backgroundColor: "red" }}>
      {props.text}
    </button>
  );
}

export function OrderButton(props: OrderButtonProps) {
  return (
    <button
      onClick={() => props.clickHandler()}
      className="store__button"
      disabled={props.disabled}>
      {props.text}
    </button>
  );
}
