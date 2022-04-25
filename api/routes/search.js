import { Router } from "express";
import { SM } from "../utils";
const r = new Router();

r.get("/vehicle/:filter", async (req, res, next) => {
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
    next(e);
  }
});

r.get("/:filter", async (req, res, next) => {
  const { filter } = req.params;
  try {
    const vehicles = await SM.GetVehicles();
    const orders = await SM.GetOrders();
    res
      .status(200)
      .json(
        filter.length < 6
          ? [...vehicles, ...orders].filter(
              (o) =>
                o?.vin?.substr(-6)?.includes(filter) ||
                `${o?.number}`.includes(filter)
            )
          : [...vehicles].filter((o) => o?.vin?.substr(-6)?.includes(filter))
      );
  } catch (e) {
    next(e);
  }
});

export default r;
