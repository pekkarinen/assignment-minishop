import React from "react";
import { Link } from "react-router-dom";
import { Products } from "./components/Products";
import { Header } from "./components/Header";

export function Store() {
  return (
    <>
      <Header text="Minishop" />
      <Link
        className="store__button"
        to="/orders">
        My orders
      </Link>
      <Products />
    </>
  );
}
