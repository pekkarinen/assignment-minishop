import React, { useState } from "react";
import { Link } from "react-router-dom";
import { OrderedProduct, Product } from "../../generated/graphql";
import { Basket } from "./components/Basket";
import { Products } from "./components/Products";
import { Header } from "./components/Header";

export function Store() {
  const [basket, setBasket] = useState<Array<OrderedProduct>>([]);

  function emptyBasket() {
    setTimeout(() => setBasket([]), 1000);
  }

  function addProduct(product: Product) {
    if (basket.some((item) => item.product.ean === product.ean)) {
      // if item is already in basket, increment
      setBasket(
        basket.map((order) => {
          if (order.product.ean === product.ean) {
            const newAmount = order.amount + 1;
            return { ...order, amount: newAmount };
          } else {
            return order;
          }
        })
      );
    } else {
      // add product to basket
      const newOrder = {
        amount: 1,
        product,
      };
      setBasket([...basket, newOrder]);
    }
  }

  return (
    <>
      <Header text="Minishop" />
      {basket.length ? (
        <Basket
          emptyBasket={emptyBasket}
          items={basket}
        />
      ) : null}
      <Link
        className="store__button"
        to="/orders">
        My orders
      </Link>
      <Products clickHandler={addProduct} />
    </>
  );
}
