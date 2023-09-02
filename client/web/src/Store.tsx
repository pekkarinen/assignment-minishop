import React from "react";
import { Link } from "react-router-dom";
import { Products } from "./components/Products";

export function Store() {
  return (
      <h1>Minishop</h1>
      <Link to="/orders">My orders</Link>
      <Products />
    </div>
  );
}
