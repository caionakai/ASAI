const express = require("express");
const routes = express.Router();
const Loyalty = require("../models/Loyalty");
const Marketing = require("../models/Marketing");
const Client = require("../models/Client");
const Sale = require("../models/Sale");
const Offer = require("../models/SpecialOffer");

//
// Loyalty
//

routes.get("/loyalty", async (request, response) => {
  try {
    const loyalties = await Loyalty.findAll();

    return response.status(200).json({ loyalties });
  } catch (error) {
    console.log(error);
    return response.status(500);
  }
});

routes.post("/loyalty", async (request, response) => {
  try {
    const { name, description } = request.body;

    const loyalty = await Loyalty.create({ name, description });

    return response.status(200).json(loyalty);
  } catch (error) {
    console.log(error);
    return response.status(500);
  }
});

routes.get("/loyalty/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const loyalty = await Loyalty.findOne({
      where: {
        id,
      },
    });

    return response.status(200).json({ loyalty });
  } catch (error) {
    console.log(error);
  }
});

//
// Marketing
//
routes.post("/", async (request, response) => {
  try {
    const { client_id, loyalty_id, offer_id, sale_id } = request.body;

    const marketing = await Marketing.create({
      client_id,
      loyalty_id,
      offer_id,
      sale_id,
    });

    return response.status(200).json({ marketing });
  } catch (error) {
    console.log(error);
  }
});

routes.get("/", async (request, response) => {
  try {
    const marketing = await await Marketing.findAll({
      include: [
        { model: Client, as: "client" },
        { model: Loyalty, as: "loyalty" },
        { model: Sale, as: "sale" },
        { model: Offer, as: "specialOffer" },
      ],
    });

    return response.status(200).json({ marketing });
  } catch (error) {
    console.log(error);
    return response.status(500);
  }
});

routes.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const marketing = await Marketing.findOne({
      where: {
        id,
      },
    });

    return response.status(200).json({ marketing });
  } catch (error) {
    console.log(error);
  }
});

routes.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const marketing = await Marketing.destroy({
      where: {
        id,
      },
    });

    return response.status(200).json({ marketing });
  } catch (error) {
    console.log(error);
  }
});

module.exports = routes;
