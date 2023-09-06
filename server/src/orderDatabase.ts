import { Order } from "./generated/graphql";
import { products } from "./productDatabase.js";

const product = ({ ean }) => products.find((product) => product.ean === ean);

export const orders: Omit<Order, "totalSum">[] = [
  {
    orderId: "order-1",
    timestamp: "2023-08-22T15:05:10+0000",
    customerId: "customer-1",
    products: [
      {
        product: product({ ean: "2000570800008" }),
        amount: 3,
      },
      {
        product: product({ ean: "2000609200007" }),
        amount: 1,
      },
      {
        product: product({ ean: "2000632900004" }),
        amount: 7,
      },
    ],
  },
  {
    orderId: "order-2",
    timestamp: "2023-08-25T13:08:16+0000",
    customerId: "customer-2",
    products: [
      {
        product: product({ ean: "2000559900002" }),
        amount: 12,
      },
      {
        product: product({ ean: "2005029300009" }),
        amount: 10,
      },
    ],
  },
  {
    orderId: "order-3",
    timestamp: "2023-08-28T10:01:16+0000",
    customerId: "customer-1",
    products: [
      {
        product: product({ ean: "2000519200005" }),
        amount: 8,
      },
      {
        product: product({ ean: "2000503700009" }),
        amount: 6,
      },
      {
        product: product({ ean: "2000632900004" }),
        amount: 1,
      },
      {
        product: product({ ean: "2005029300009" }),
        amount: 4,
      },
    ],
  },
];
