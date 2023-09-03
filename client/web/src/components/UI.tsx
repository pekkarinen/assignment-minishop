import React from "react";
import { Product } from "../../../generated/graphql";

type ButtonProps = {
  text: string;
  product: Product;
  clickHandler: Function;
};

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={() => props.clickHandler(props.product)}
      className="store__button">
      {props.text}
    </button>
  );
}
