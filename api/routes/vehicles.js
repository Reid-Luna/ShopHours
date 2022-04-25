import { Router } from "express";
import { SM } from "../utils";
const r = new Router();

r.get("/recent", async (req, res) => {
  try {
    const vehicles = await SM.GetRecentVehicles();
    return res.status(200).json(vehicles);
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default r;
