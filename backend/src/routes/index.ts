import { Router, Express } from "express";
import { productRoutes } from "../modules/products/routes/product.routes";
import { orderRoutes } from "../modules/orders/routes/order.routes";

export const routes = (app: Express) => {
  const router = Router();
  productRoutes(router);
  orderRoutes(router);
  app.use("/v1", router);
};
export default routes;
