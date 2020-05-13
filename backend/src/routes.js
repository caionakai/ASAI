import { Router } from "express";
import Loyalty from "./models/loyalty.model";
import loyaltyService from "./services/loyalty.service";
import marketingService from "./services/marketing.service";

const routes = Router();

//
// Loyalty
//
routes.post("/loyalty", async (request, response) => {
  try {
    const { name, description } = request.body;
    await loyaltyService.create(name, description);

    return response.status(200).send();
  } catch (error) {
    console.log(error);
  }
});

routes.get("/loyalty", async (request, response) => {
  try {
    const query = await loyaltyService.list();

    const loyalties = query.map(
      ({ id, name, description }) => new Loyalty(id, name, description)
    );
    return response.status(200).json({ loyalties });
  } catch (error) {
    console.log(error);
  }
});

routes.get("/loyalty/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const [query] = await loyaltyService.fetch(id);
    const { name, description } = query;
    const loyalty = new Loyalty(id, name, description);

    return response.status(200).json({ loyalty });
  } catch (error) {
    console.log(error);
  }
});

routes.patch("/loyalty/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { name, description } = request.body;
    await loyaltyService.edit(id, name, description);

    return response.status(200).send();
  } catch (error) {
    console.log(error);
  }
});

//
// Marketing
//
routes.post("/marketing", async (request, response) => {
  try {
    const { client_id, loyalty_id, offer_id, sale_id } = request.body;
    await marketingService.create(client_id, loyalty_id, offer_id, sale_id);

    return response.status(200).send();
  } catch (error) {
    console.log(error);
  }
});

routes.get("/marketing", async (request, response) => {
  try {
    const query = await marketingService.list();

    return response.status(200).json({ marketing: query });
  } catch (error) {
    console.log(error);
  }
});

routes.get("/marketing/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const [query] = await marketingService.fetch(id);

    return response.status(200).json({ marketing: query });
  } catch (error) {
    console.log(error);
  }
});

export default routes;
