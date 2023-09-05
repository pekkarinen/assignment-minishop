import React from "react";
import { useQuery } from "@apollo/client";
import { ProductCard } from "./ProductCard";
import { productsQuery } from "../graphql/queries";

type ProductListProps = {
  clickHandler: Function;
};

export function Products(props: ProductListProps) {
  const { loading, data } = useQuery(productsQuery);

  const displayData = () => {
    if (!data) {
      return <p>No Products</p>;
    }

    return (
      <div className="store__products-list">
        {data.products.map((product) => (
          <ProductCard
            key={product.ean}
            product={product}
            clickHandler={props.clickHandler}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="store__products">
      <header className="store__products__header">
        <h2>Available products</h2>
      </header>
      {loading ? <p>Loading products...</p> : displayData()}
    </section>
  );
}
