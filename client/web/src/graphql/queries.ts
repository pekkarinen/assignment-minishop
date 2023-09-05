import { gql } from "../../../generated";

export const productsQuery = gql(`
  query getProductsWeb {
    products {
      ean
      name
      price
      imageUrl
    }
  }
`);
export const ordersQuery = gql(`
  query getOrders($customerId: ID!) {
    orders(customerId: $customerId) {
      orderId
      customerId
      timestamp
      totalSum
    }
  }`);

export const orderQuery = gql(`
  query getOrder($orderId: ID!, $customerId: ID!) {
    order(orderId: $orderId, customerId: $customerId) {
      orderId
      customerId
      timestamp
      products {
        product {
          name
          price
          ean
          imageUrl
        }
        amount
      }
      totalSum
    }
  }`);

export const createOrderMutation = gql(`
  mutation CreateOrderWithProducts($customerId: String!, $products: [ProductInput!]!) {
    createOrderWithProducts(customerId: $customerId, products: $products) {
      success
      message
      order {
        orderId
      }
    }
  }
`);
