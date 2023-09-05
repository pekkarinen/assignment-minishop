import React, { useRef } from "react";
import { OrderedProduct } from "../../../generated/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";
import { OrderButton } from "./UI";
import { ItemTable } from "./ItemTable";
import { ordersQuery } from "../Orders";

const createOrderMutation = gql`
  mutation CreateOrderWithProducts($customerId: String!, $products: [ProductInput!]!) {
    createOrderWithProducts(customerId: $customerId, products: $products) {
      success
      message
      order {
        orderId
      }
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
  emptyBasket: Function;
};

export function Basket(props: BasketProps) {
  const customerId = "customer-1";
  // ordersQuery for refetchQueries
  useQuery(ordersQuery, { variables: { customerId } });
  const [sendOrder, { data, loading, error }] = useMutation(createOrderMutation, {
    refetchQueries: ["getOrders"],
  });

  const buttonText = useRef("Send order");
  const buttonDisabled = useRef(false);

  if (loading) {
    buttonText.current = "Sending order";
    buttonDisabled.current = true;
  }

  if (error) buttonText.current = "Error sending order";

  if (data) {
    buttonText.current = "Order sent";
    props.emptyBasket();
  }

  return (
    <div className="store__basket">
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
          sendOrder({
            variables: {
              customerId: "customer-1",
              products: productInputs,
            },
          });
        }}
        disabled={buttonDisabled.current}
        text={buttonText.current}
      />
    </div>
  );
}
