const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
 
const schema = buildSchema(`
  type Query {
    categories: [Category]
    category(code:String!): Category
    product(sku:String!): Product
    cart(user: String!): Cart
  },
  type Mutation {
    createProduct(sku: String!, name: String!, category: String!, pictures: [String], description: String, price: Int): Product
    deleteProduct(sku: String!): String
    addToCart(user: String!, products: [CartProductInputData]):Cart
    checkout(user: String!, delivery: DeliveryInputData): Order
  }
  type Category {
    code: String!
    name: String!
    url: String
    products: [Product]
  }
  type Product {
    sku: String!
    name: String!
    url: String
    pictures:[String]
    description: String
    price: Int
  }
  #представление товара в козине и заказы (поля для встраивания)
  type CartProduct {
    sku: String!
    name: String!
    picture: String
    price: Int!
    quantity: Int!
  }
  type User {
    email: String!
    firstName: String!
    lastName: String
  }
  type Cart {
    user: String
    products: [CartProduct]
  }
  #входные данные для мутации типа AddToCart
  input CartProductInputData {
    sku: String!
    quantity: Int
  }
  #типы-перечисления для оформления заказа - службы доставки и статусы
  enum DeliveryService {
    selfdelivery
    sdek
    ems
  }
  enum OrderStatus {
    new
    payed
    fulfilled
    cancelled
  }
  type Delivery {
    service: DeliveryService!
    price: Int!
    address: String
  }
  #входные данные дл мутации checkout
  input DeliveryInputData {
    service: DeliveryService!
    price: Int!
    address: String
  }
  #определение скалярного типа для представления дат
  scalar Date
  type Order {
    number: Int!
    createdAt: Date!
    user: User!
    products:[CartProduct]
    delivery: Delivery
    status: OrderStatus
  }
`);

module.exports = schema;