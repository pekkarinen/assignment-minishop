import React from "react";
import { OrderedProduct } from "../../../generated/graphql";

type BasketProps = {
  items: [OrderedProduct];
};

export function Basket(props: BasketProps) {
  return (
    <div className="store__basket">
      {props.items?.map((item) => (
        <p>
          {item.amount} {item.product.name}
        </p>
      ))}
    </div>
  );
}
