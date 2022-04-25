import { Router } from "express";
import { SM } from "../utils";
const r = new Router();

r.get("/current", async (req, res, next) => {
  try {
    const orders = await SM.GetOrdersInProgress();
    return res.status(200).json(orders);
  } catch (e) {
    next(e);
  }
});

export default r;
