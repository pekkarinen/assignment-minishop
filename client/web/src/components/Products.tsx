import React from "react";
import { useQuery } from "@apollo/client";
import { ProductCard } from "./ProductCard";
import { gql } from "../../../generated";

const getProductsQuery = gql(`
  query getProducts {
    products {
      ean
      name
      price
    }
  }
`);

export function Products() {
  const { loading, data } = useQuery(getProductsQuery);
  const displayData = () => {
    if (!data) {
      return <p>No Products</p>;
    }

    return (
      <div className="store__products">
        {data.products.map((product) => (
          <ProductCard
            key={product.ean}
            name={product.name}
            ean={product.ean}
            price={product.price}
          />
        ))}
      </div>
    );
  };

  return(
      <section className="store__products">
        <header className="store__products__header">
          <h2>Available products</h2>
        </header>
        {loading ? <p>Loading products...</p> : displayData()}
      </section>
  )
}