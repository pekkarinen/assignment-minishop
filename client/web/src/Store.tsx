import React, { useState } from "react";
import { Link } from "react-router-dom";
import { OrderedProduct, Product } from "../../generated/graphql";
import { Basket } from "./components/Basket";
import { Products } from "./components/Products";
import { Header } from "./components/Header";

export function Store() {
  const [user, setUser] = useState("customer-1");
  const [basket, setBasket] = useState<Array<OrderedProduct>>([]);

  function addProduct(product: Product) {
    if (basket.some((item) => item.product.ean === product.ean)) {
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
      <Basket items={basket} />
      <Link
        className="store__button"
        to="/orders">
        My orders
      </Link>
      <Products clickHandler={addProduct} />
    </>
  );
}
