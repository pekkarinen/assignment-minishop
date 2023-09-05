import React from "react";
import { OrderedProduct } from "../../../generated/graphql";
import { gql, useMutation } from "@apollo/client";
import { OrderButton } from "./UI";
import { ItemTable } from "./ItemTable";

const createOrderMutation = gql`
  mutation CreateOrderWithProducts($customerId: String!, $products: [ProductInput!]!) {
    createOrderWithProducts(customerId: $customerId, products: $products) {
      success
      message
    }
  }
`;

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
  const [sendOrder, { data, loading, error }] = useMutation(createOrderMutation);

  if (loading) return "sending order...";
  if (error) return `Oh no! ${error.message}`;

  return (
    <div className="store__basket">
      {data.success ? (
        <>"order sent"</>
      ) : (
        <>
          <ItemTable
            products={props.items}
            totalSum={totalSum(props.items)}
          />

          <OrderButton
            clickHandler={() => {
              const productInputs = props.items.map((item) => ({
                ean: item.product.ean,
                amount: item.amount,
              }));
              console.log(productInputs);
              sendOrder({
                variables: {
                  customerId: "customer-1",
                  products: productInputs,
                },
              });
            }}
            text="Send order"
          />
        </>
      )}
    </div>
  );
}
