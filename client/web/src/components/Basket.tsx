import React from "react";
import { OrderedProduct } from "../../../generated/graphql";
import { ItemTable } from "./ItemTable";

function totalSum(products: OrderedProduct[]) {
  const totalSum = products.reduce((acc, curr) => {
    const price = curr.amount * curr.product.price;
    return acc + price;
  }, 0);
  return Number(totalSum.toFixed(2));
}

type BasketProps = {
  items: OrderedProduct[];
};

export function Basket(props: BasketProps) {
  return (
    <div className="store__basket">
      <ItemTable
        products={props.items}
        totalSum={totalSum(props.items)}
      />
    </div>
  );
}
