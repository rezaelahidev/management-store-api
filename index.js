const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefs = `
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    inStock: Boolean!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(
      name: String!
      description: String!
      price: Float!
    ): Product!

    updateProductPrice(
      id: ID!
      price: Float!
    ): Product
  }
`;

let products = [
  {
    id: "1",
    name: "MacBook Pro M3",
    descripton: "made in 2023",
    price: "2500$",
    inStock: true,
  },
  {
    id: "2",
    name: "MacBook Pro M1",
    description: "made in 2020",
    price: "1900$",
    inStock: true,
  },
];

const resolvers = {
  Query: {
    products: () => products,

    product: (_, { id }) => {
      return products.find((product) => product.id === id) ?? null;
    },
  },

  Mutation: {
    addProduct: (_, { name, description, price }) => {
      const newProduct = {
        id: String(Date.now()),
        name,
        description,
        price,
        inStock: true,
      };

      products.push(newProduct);

      return newProduct;
    },

    updateProductPrice: (_, { id, price }) => {
      const product = products.find((product) => product.id === id);

      if (!prodcut) {
        return null;
      }

      product.price = price;

      return product;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.all(
  "/graphql",
  createHandler({
    schema,
  })
);

app.listen(4000, () => {
  console.log("GraphQL server running at http://localhost:4000/graphql");
});