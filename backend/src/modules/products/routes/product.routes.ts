import { Router } from "express";
import { productController } from "../product.controller";

export const productRoutes = (router: Router) => {
  router.get("/products", productController.getProducts);
};
