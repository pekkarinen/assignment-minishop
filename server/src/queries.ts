import { QueryResolvers, OrderedProduct } from "./generated/graphql.js";
import { orders } from "./orderDatabase.js";
import { products } from "./productDatabase.js";

function totalSum(products: OrderedProduct[]) {
  return products.reduce((acc, curr) => acc + curr.amount, 0);
}

export const queries: QueryResolvers = {
  orders: async (_parent, _args, _context) => {
    return orders
      .filter((order) => order.customerId === _args.customerId)
      .map((order) => ({
        ...order,
        totalSum: totalSum(order.products),
      }));
  },
  products: async (_parent, _args, _context) => {
    return products;
  },
};
