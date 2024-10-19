import React from "react";
import { IProduct } from "../pages/Home";

const Product = ({ data }: { data: IProduct }) => {
  return (
    <div>
      <p className="text-gray-600 text-xs" key={data.id}>
        {data.name}-${data.price} - {data.weight}g
      </p>
    </div>
  );
};

export default Product;
