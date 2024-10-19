import { NextFunction, Response, Request } from "express";
import { productService } from "./product.service";
import { Iproduct } from "../interfaces/productInterface";

export const productController = {
  async getProducts(
    req: Request<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<Iproduct[] | any> {
    try {
      const productArr = productService.getProducts();
      if (!productArr) {
        return res.json({
          status: "Success",
          data: [],
          message: "Successfully fetched the products",
        });
      }
      res.json({
        status: "Success",
        data: productArr,
        message: "Successfully fetched the products",
      });
    } catch (error) {
      next(error);
    }
  },
};
