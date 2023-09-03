import React from "react";
import { Link } from "react-router-dom";
import { Products } from "./components/Products";

export function Store() {
  return (
    <>
      <header className="store__header">
        <h1>Minishop</h1>
      </header>
      <Link
        className="store__button"
        to="/orders">
        My orders
      </Link>
      <Products />
    </>
  );
}
