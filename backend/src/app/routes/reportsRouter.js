const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  const joinedTables = [
    {
      idSalesItem: 1,
      quantity: 1,
      price: 5.0,
      sale: {
        idSale: 1,
        purchaseDate: "16-02-2019",
        discountPercentage: 20,
        client: {},
        seller: {},
      },
      product: [
        {
          idProduct: 1,
          name: "Cornflakes",
          price: 5.0,
          brand: {
            idBrand: 1,
            name: "Kellogs",
          },
          category: {
            idCategory: 1,
            name: "Food",
          },
        },
      ],
    },
    {
      idSalesItem: 2,
      quantity: 1,
      price: 6.6,
      sale: {
        idSale: 2,
        purchaseDate: "20-12-2019",
        discountPercentage: 10,
        client: {},
        seller: {},
      },
      product: [
        {
          idProduct: 22,
          name: "Shirt",
          price: 100.0,
          brand: {
            idBrand: 2,
            name: "Nike",
          },
          category: {
            idCategory: 2,
            name: "Clothing",
          },
        },
      ],
    },
    {
      idSalesItem: 3,
      quantity: 1,
      price: 16.0,
      sale: {
        idSale: 3,
        purchaseDate: "19-12-2019",
        discountPercentage: 10,
        client: {},
        seller: {},
      },
      product: [
        {
          idProduct: 23,
          name: "Jacket",
          price: 200.0,
          brand: {
            idBrand: 3,
            name: "Nike",
          },
          category: {
            idCategory: 3,
            name: "Clothing",
          },
        },
      ],
    },
    {
      idSalesItem: 4,
      quantity: 2,
      price: 200,
      sale: {
        idSale: 3,
        purchaseDate: "03-05-2020",
        discountPercentage: 10,
        client: {},
        seller: {},
      },
      product: [
        {
          idProduct: 23,
          name: "Jacket",
          price: 200.0,
          brand: {
            idBrand: 3,
            name: "Adidas",
          },
          category: {
            idCategory: 3,
            name: "Clothing",
          },
        },
        {
          idProduct: 23,
          name: "Jacket",
          price: 200.0,
          brand: {
            idBrand: 3,
            name: "Nike",
          },
          category: {
            idCategory: 3,
            name: "Clothing",
          },
        },
      ],
    },
  ];

  return response.json(joinedTables);
});

module.exports = router;
