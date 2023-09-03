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
    return order ? { ...order, totalSum: totalSum(order.products) } : null;
  },
  orders: async (_parent, _args, _context) => {
    return orders
      .filter((order) => order.customerId === _args.customerId)
      .map((order) => ({
        ...order,
        totalSum: totalSum(order.products),
      }));
  },
  product: async (_parent, _args: { ean: string }, _context) => {
    const product = products.find((product) => product.ean === _args.ean);
    return product ?? null;
  },
  products: async (_parent, _args, _context) => {
    return products;
  },
};
