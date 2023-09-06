import React, { useRef, useContext } from "react";
import { Navigate } from "react-router-dom";
import { OrderedProduct } from "../../../generated/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { OrderButton } from "./UI";
import { ItemTable } from "./ItemTable";
import { ordersQuery } from "../graphql/queries";
import { UserContext } from "../UserContext";
import { createOrderMutation } from "../graphql/queries";

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
  const customerId = useContext(UserContext);
  // need to reference ordersQuery for refetchQueries
  useQuery(ordersQuery, { variables: { customerId } });

  const [sendOrder, { data, loading, error }] = useMutation(createOrderMutation, {
    refetchQueries: ["getOrders"],
  });

  // button indicates request status
  const buttonText = useRef("Send order");
  const buttonDisabled = useRef(false);

  if (loading) {
    buttonText.current = "Sending order";
    buttonDisabled.current = true;
  }

  if (error) {
    buttonText.current = "Error sending order";
  }

  if (data?.createOrderWithProducts?.success) {
    buttonText.current = "Order sent";
  }

  return (
    <div className="store__basket">
      <ItemTable
        products={props.items}
        totalSum={totalSum(props.items)}
      />
      {data?.createOrderWithProducts?.order ? (
        <Navigate
          to={`/orders/${data.createOrderWithProducts.order.orderId}`}
          replace={true}
        />
      ) : (
        <OrderButton
          clickHandler={() => {
            const productInputs = props.items.map((item) => ({
              ean: item.product.ean,
              amount: item.amount,
            }));
            sendOrder({
              variables: {
                customerId,
                products: productInputs,
              },
            });
          }}
          disabled={buttonDisabled.current}
          text={buttonText.current}
        />
      )}
    </div>
  );
}
