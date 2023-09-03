import { QueryResolvers, OrderedProduct } from "./generated/graphql.js";
import { orders } from "./orderDatabase.js";
import { products } from "./productDatabase.js";

function totalSum(products: OrderedProduct[]) {
  return products.reduce((acc, curr) => {
    const price = Number((curr.amount * curr.product.price).toFixed(2));
    return acc + price;
  }, 0);
}

export const queries: QueryResolvers = {
  order: async (_parent, _args, _context) => {
    const order = orders.find(
      (order) => order.orderId === _args.orderId && order.customerId === _args.customerId
    );
    if (order) {
      return { ...order, totalSum: totalSum(order.products) };
    } else {
      return;
    }
  },
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
