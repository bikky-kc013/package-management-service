import { Router } from "express";
import { orderController } from "../order.controller";
import ZOD from "../../../lib/Zod";
import { orderSchema } from "../schema/order.schema";

export const orderRoutes = (router: Router) => {
  router.post(
    "/order",
    ZOD.requestAsyncParser({
      schema: orderSchema,
      type: "Body",
    }),
    orderController.addOrder
  );
};
