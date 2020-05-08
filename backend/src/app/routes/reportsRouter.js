const express = require("express");
const router = express.Router();

const SaleItem = require('../models/SaleItem')
const Sale = require('../models/Sale')
const Product = require('../models/Product')
const Brand = require('../models/Brand')
const ProductCategory = require('../models/ProductCategory')

const listAll = async () => {
  try {
      const reports = await SaleItem.findAll({
        include: [
          {
            model: Sale,
            foreignKey: 'id',
            as: 'sale',
          }
        ],
        include: [
          // this.hasMany(models.Brand, { foreignKey: 'id', as: 'brand' });
          // this.hasMany(models.ProductCategory, { foreignKey: 'id', as: 'category' });
          {
            model: Product,
            foreignKey: 'id',
            as: 'product',
            include: [
              {
                model: Brand,
                foreignKey: 'id',
                as: 'brand',
              }
            ],
            include: [
              {
                model: ProductCategory,
                foreignKey: 'id',
                as: 'category',
              }
            ]
          }
        ]
      }).then((reports) => {
        const resObj = reports.map((report) => {
          return Object.assign(
            {},
            {
              quantity: report.quantity,
              price: report.price,
              sale: report.Sale.map((sale) => {
                return Object.assign(
                  {},
                  {
                    purchaseDate: sale.purchase_date,
                    discountPercentage: sale.discount_percentage,
                  }
                )
              }),
              product: report.Product.map((product) => {
                return Object.assign(
                  {},
                  {
                    name: product.name,
                    price: product.price,
                    brand: product.Brand.map((brand) => {
                      return Object.assign(
                        {},
                        {
                          name: brand.name,
                        }
                      )
                    }),
                    category: product.ProductCategory.map((category) => {
                      return Object.assign(
                        {},
                        {
                          name: category.name,
                        }
                      )
                    })
                  }
                )
              })
            }
          )
        })
      }
      );
      return reports;
  } catch (error) {
      console.error("\nError fetching REPORTS MODULE tables.\n\n", error);
  }
}

router.get("/", (request, response) => {
  // const tables = listAll();
  // console.log(tables);
  const joinedTables = [
    {
      idSalesItem: 1,
      quantity: 1,
      price: 1000.0,
      sale: {
        idSale: 1,
        purchaseDate: "16-01-2019",
        discountPercentage: 20,
        client: {},
        seller: {},
      },
      product: [
        {
          idProduct: 1,
          name: "Watch",
          price: 1000.0,
          brand: {
            idBrand: 1,
            name: "Rolex",
          },
          category: {
            idCategory: 1,
            name: "Jewellery",
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
      price: 550,
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
          name: "Pants",
          price: 150.0,
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
    {
      idSalesItem: 4,
      quantity: 3,
      price: 90,
      sale: {
        idSale: 3,
        purchaseDate: "03-01-2020",
        discountPercentage: 30,
        client: {},
        seller: {},
      },
      product: [
        {
          idProduct: 30,
          name: "Pants",
          price: 30.0,
          brand: {
            idBrand: 3,
            name: "Spalding",
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
      price: 80,
      sale: {
        idSale: 3,
        purchaseDate: "01-12-2019",
        discountPercentage: 30,
        client: {},
        seller: {},
      },
      product: [
        {
          idProduct: 30,
          name: "Hat",
          price: 20.0,
          brand: {
            idBrand: 3,
            name: "Mizuno",
          },
          category: {
            idCategory: 3,
            name: "Accessories",
          },
        },
      ],
    },
  ];

  return response.json(joinedTables);
});

module.exports = router;
