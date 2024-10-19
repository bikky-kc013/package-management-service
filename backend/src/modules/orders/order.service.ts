import { Iproduct } from "../interfaces/productInterface";
import { orderInsertType } from "./schema/order.schema";
import { courierPackagingInfo } from "../../constants/courierCharge";
import { Exception } from "../../errors/Exception";
import { products } from "../../constants/products";

//Business logic related to packaging and ordering
export const orderService = {
  placeOrder({ items }: { items: orderInsertType }) {
    try {
      const sortedProducts = this.sortProducts({ items }); //sorting the orderItems(products) based on its weight and then price
      const packages = this.generatePackage({ products: sortedProducts });
      return packages;
    } catch (error) {
      throw error;
    }
  },
  //sorting the products based on their weight (ascending) and price
  sortProducts({ items }: { items: orderInsertType }) {
    return items.id
      .map((itemId) => products.filter((product) => product.id === itemId)) //searching the items from the database i.e. products object
      .flat()
      .sort((a, b) => {
        if (a.weight === b.weight) {
          //sorting by weight first then sorting by price
          return a.price - b.price;
        }
        return a.weight - b.weight;
      });
  },
  // calculating the charges based on the weight and packaging the items
  generatePackage({ products }: { products: Iproduct[] }) {
    try {
      const maximumPackageCapacity = this.calculateMaximumPackageCapacity()!; // calculating the maximum capacity that our container can hold
      const packages = [];
      let currentPackage: Iproduct[] = [];
      let totalPrice = 0;
      let totalWeight = 0;

      products.forEach((product) => {
        // checking if the items meets the condition
        if (
          totalPrice + product.price > 250 ||
          totalWeight + product.weight > maximumPackageCapacity
        ) {
          if (currentPackage.length > 0) {
            //if the condition is met then pushing the products in the temp data i.e package variable
            packages.push({
              items: currentPackage.map((item) => item.name),
              totalPrice,
              totalWeight,
              courierPrice: this.calculateCourierCharges({ totalWeight }),
            });
          }

          // clearing out the data for inserting remaining products whose condition was not meet above
          currentPackage = [];
          totalPrice = 0;
          totalWeight = 0;
        }

        currentPackage.push(product);
        totalPrice += product.price;
        totalWeight += product.weight;
      });

      if (currentPackage.length > 0) {
        packages.push({
          items: currentPackage.map((item) => item.name),
          totalPrice,
          totalWeight,
          courierPrice: this.calculateCourierCharges({ totalWeight }),
        });
      }
      return packages;
    } catch (error) {
      throw error;
    }
  },
  //calculating the courier charge as per their weight
  calculateCourierCharges({ totalWeight }: { totalWeight: number }) {
    const courier = courierPackagingInfo.find(
      (data) => totalWeight <= data.weight
    );
    if (courier) {
      return courier.charge;
    } else {
      throw new Exception("Maximum limit exceeded", 400);
    }
  },
  //calculating maxium capacity so that the items avove the limit can be packaged in another package
  calculateMaximumPackageCapacity() {
    try {
      const sortedPackageCapacity = courierPackagingInfo.sort(
        (a, b) => a.weight - b.weight
      );
      return sortedPackageCapacity[sortedPackageCapacity.length - 1].weight;
    } catch (error) {
      console.log(error);
    }
  },
};
