import { Router } from "express";
import { SM } from "../utils";
const r = new Router();

r.get("/order/:filter", async (req, res) => {
  const { filter } = req.params;
  try {
    const order = await SM.GetOrdersInProgress(filter);
    res
      .status(200)
      .json(
        filter.length < 6
          ? order
          : order.filter((o) => o.vehicle?.vin?.substr(-6) === filter)
      );
  } catch (e) {
    res.status(500).json({ e });
  }
});

r.get("/vehicle/:filter", async (req, res) => {
  const { filter } = req.params;
  try {
    const vehicles = await SM.GetVehicles();
    res
      .status(200)
      .json(
        filter.length < 6
          ? vehicles.filter((o) => o.vin?.substr(-6).includes(filter))
          : vehicles.filter((o) => o.vin?.substr(-6) === filter)[0]
      );
  } catch (e) {
    res.status(500).json({ e });
  }
});

export default r;
