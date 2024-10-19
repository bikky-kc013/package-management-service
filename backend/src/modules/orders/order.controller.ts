import { NextFunction, Response, Request } from "express";
import { orderService } from "./order.service";
import { Iproduct } from "../interfaces/productInterface";
import { orderInsertType } from "./schema/order.schema";

export const orderController = {
  async addOrder(
    req: Request<{}, {}, orderInsertType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const items = req.body;
      const orders = orderService.placeOrder({ items });
      res.json({
        status: "Success",
        data: orders,
        message: "Successfully placed the order",
      });
    } catch (error) {
      next(error);
    }
  },
};
