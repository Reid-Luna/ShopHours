import { Router } from "express";
import { SM } from "../utils";
const r = new Router();

r.get("/order/:orderNumber/", (req, res) => {
  res.status(200).json({working: true});
  try{
  const services = await SM.GetServicesForOrder(req.params.orderNumber);
  console.log(services)
}catch(e){
  console.log(e)
}})

export default r;