import api from "api";
import de from "./dotenv";

const { SHOPM_PUB, SHOPM_PRV } = process.env;

const ShopMonkey = api("@shopmonkey/v2.0#309o819xl1z0602i");

export const Info = {
  auth: false,
};

export const Auth = () => {
  console.log({
    privateKey: SHOPM_PRV,
    publicKey: SHOPM_PUB,
  });
  ShopMonkey["AuthController_generateToken"](
    {
      privateKey: SHOPM_PRV,
      publicKey: SHOPM_PUB,
    },
    { Accept: "text/html" }
  )
    .then((res) => {
      ShopMonkey.auth(res);
      Info.auth = res;
      console.log("ShopMonkey Authed:", res);
    })
    .catch((err) => console.error(err));
};

export const GetVehicles = () =>
  new Promise((r, j) =>
    ShopMonkey["VehiclesController_get"]({
      includeShopmonkeyVehicles: "false",
      sort: "-creationDate",
      offset: "0",
      limit: "100000",
    })
      .then((res) => r(res))
      .catch((err) => j(err))
  );

export const GetOrder = (number) =>
  new Promise((r, j) =>
    ShopMonkey["OrdersController_getOrders"]({
      limit: "100",
      offset: "0",
      number,
      sort: "-creationDate",
    })
      .then((res) => r(res))
      .catch((err) => j(err))
  );

export const GetServicesForOrder = (orderId) =>
  new Promise((r, j) =>
    ShopMonkey["ServicesController_getAll"]({ orderId })
      .then((res) => r(res))
      .catch((err) => j(err))
  );

export const GetOrdersInProgress = () =>
  new Promise((r, j) =>
    ShopMonkey["OrdersController_getOrders"]({
      limit: "100",
      offset: "0",
      sort: "-creationDate",
      //workflow: "Repair%20in%20Progress",
    })
      .then((res) => r(res))
      .catch((err) => j(err))
  );
