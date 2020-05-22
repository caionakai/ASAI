const express = require("express");
const router = express.Router();

const SaleItem = require("../models/SaleItem");
const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Brand = require("../models/Brand");
const ProductCategory = require("../models/ProductCategory");

const listAll = async () => {
  try {
    const reports = await SaleItem.findAll({
      include: [
        {
          model: Sale,
          foreignKey: "id",
          as: "sale",
        },
        {
          model: Product,
          foreignKey: "id",
          as: "product",
          include: [
            {
              model: Brand,
              foreignKey: "id",
              as: "Brand",
            },
            {
              model: ProductCategory,
              foreignKey: "id",
              as: "ProductCategory",
            },
          ],
        },
      ],
    }).then((reports) => {
      return reports.map((report) => {
        report = report.dataValues;
        return Object.assign(
          {},
          {
            idSalesItem: report.id,
            quantity: report.quantity,
            price: report.price,
            //Format object Sale
            sale: report.sale.map((sale) => {
              return Object.assign(
                {},
                {
                  idSale: sale.id,
                  purchaseDate: sale.purchase_date,
                  discountPercentage: sale.discount_percentage,
                }
              );
            }),
            //Format object product
            product: report.product.map((product) => {
              product = product.dataValues;
              return Object.assign(
                {},
                {
                  idProduct: product.id,
                  name: product.name,
                  price: product.price,
                  //Format object brand
                  brand: product.Brand.map((brand) => {
                    return Object.assign(
                      {},
                      {
                        idBrand: brand.id,
                        name: brand.name,
                      }
                    );
                  }),
                  //Format object category
                  category: product.ProductCategory.map((category) => {
                    return Object.assign(
                      {},
                      {
                        idCategory: category.id,
                        name: category.name,
                      }
                    );
                  }),
                }
              );
            }),
          }
        );
      });
    });

    return reports;
  } catch (error) {
    console.error("\nError fetching REPORTS MODULE tables.\n\n", error);
  }
};

router.get("/", async (request, response) => {
  const tables = await listAll();

  return response.json(tables);
});

module.exports = router;
