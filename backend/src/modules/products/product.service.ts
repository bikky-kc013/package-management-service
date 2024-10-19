import { products } from "../../constants/products";
import { Iproduct } from "../interfaces/productInterface";

export const productService = {
  getProducts() {
    try {
      const productArr: Iproduct[] = products;
      return productArr;
    } catch (error) {
      throw error;
    }
  },
};
