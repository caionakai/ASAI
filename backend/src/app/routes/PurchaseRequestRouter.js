const express = require("express");
const router = express.Router();
const purchaseRequestController = require("../controllers/PurchaseRequestController");

const isTimeout = (response) => {
  return response["error"]["parent"]["errorno"] == "ETIMEDOUT";
};

const timeout = (res) => {
  return res.status(504).json({ successful: false, error: "Timeout" });
};
const undefinedError = (res) => {
  return res
    .status(400)
    .json({ successful: false, error: `Fail to get all PurchaseRequest` });
};
const error = (response, res) => {
  return isTimeout(response) ? timeout(res) : undefinedError(res);
};

router.get("/", async (req, res) => {
  const response = await purchaseRequestController.getAll();

  if (!response["successful"]) {
    return error(response, res);
  }

  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await purchaseRequestController.getById(id);

  if (!response["successful"]) {
    return error(response, res);
  }

  return res.send(response);
});

router.post("/", async (req, res) => {
  const response = await purchaseRequestController.save(req.body);

  if (!response["successful"]) {
    return error(response, res);
  }

  return res.send(response);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await purchaseRequestController.update(id, req.body);

  if (!response["successful"]) {
    return error(response, res);
  }

  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await purchaseRequestController.delete(id);

  if (!response["successful"]) {
    return error(response, res);
  }

  return res.send(response);
});

module.exports = router;
