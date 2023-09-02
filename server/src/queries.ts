import { QueryResolvers } from "./generated/graphql.js";
import { orders } from "./orderDatabase.js";
import { products } from "./productDatabase.js";

export const queries: QueryResolvers = {
  orders: async (_parent, _args, _context) => {
    // TODO: Calculate sum, only return orders for requested user
    return orders.filter(order => order.customerId === _args.customerId).map((order) => ({ ...order, totalSum: 0 }));
  },
  products: async (_parent, _args, _context) => {
    return products;
  },
};
