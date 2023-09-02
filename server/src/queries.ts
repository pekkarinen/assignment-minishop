import { QueryResolvers } from "./generated/graphql.js";
import { orders } from "./orderDatabase.js";
import { products } from "./productDatabase.js";

export const queries: QueryResolvers = {
  orders: async (_parent, _args, _context) => {
    return orders
      .filter((order) => order.customerId === _args.customerId)
      .map((order) => ({
        ...order,
        totalSum: order.products.reduce((acc, curr) => acc + curr.amount, 0),
      }));
  },
  products: async (_parent, _args, _context) => {
    return products;
  },
};
