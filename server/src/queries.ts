import { QueryResolvers, MutationResolvers, OrderedProduct, Order } from "./generated/graphql.js";
import { orders } from "./orderDatabase.js";
import { products } from "./productDatabase.js";

function totalSum(products: OrderedProduct[]) {
  const totalSum = products.reduce((acc, curr) => {
    const price = curr.amount * curr.product.price;
    return acc + price;
  }, 0);
  return Number(totalSum.toFixed(2));
}

function getFreeOrderId() {
  //todo: implement
  return "order-4";
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
export const mutations: MutationResolvers = {
  createOrder: async (_parent, _args, _context) => {
    const customerId = _args.customerId;
    const timestamp = String(new Date());
    const orderId = getFreeOrderId();
    const order: Order = {
      orderId,
      timestamp,
      customerId,
      products: [],
      totalSum: 0,
    };
    orders.push(order);
    return {
      success: true,
      message: "Order created",
      order,
    };
  },
