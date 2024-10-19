import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../components/Product";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  weight: number;
}

interface IPackage {
  items: string[];
  totalPrice: number;
  totalWeight: number;
  courierPrice: number;
}

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productId, setProductId] = useState<string[]>([]);
  const [packages, setPackages] = useState<IPackage[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/v1/products");
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckBox = (productId: string, isChecked: boolean) => {
    setProductId((prev) =>
      isChecked ? [...prev, productId] : prev.filter((id) => id !== productId)
    );
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post("http://localhost:4000/v1/order", {
        id: productId,
      });
      setPackages(response.data.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <ul className="flex flex-col items-start  w-full">
          {products.map((product) => (
            <li key={product.id} className="px-6 py-1 w-[20%] flex">
              <input
                type="checkbox"
                id={product.id}
                className="mr-2 "
                onChange={(e) => handleCheckBox(product.id, e.target.checked)}
              />
              <Product {...{ data: product }} />
            </li>
          ))}
        </ul>

        <h1 className=" text-center h-10 w-[20%] border rounded-lg py-2">
          Scroll down to see the orders
        </h1>

        <button
          onClick={placeOrder}
          className="my-10 h-10 w-36 bg-black rounded-lg text-white hover:shadow-2xl cursor-pointer"
        >
          Place Order
        </button>
      </div>
      {packages.length > 0 && (
        <div className="w-full mt-10">
          <h2 className="text-lg font-bold mb-4">packages</h2>
          <ul className="space-y-4">
            {packages.map((item, idx) => (
              <li key={idx} className="border p-4 rounded-lg">
                <h3 className="font-semibold">Package {idx + 1}</h3>
                <p>Items: {item.items.join(", ")}</p>
                <p>Total weight: {item.totalWeight}g</p>
                <p>Total price: ${item.totalPrice.toFixed(2)}</p>
                <p>Courier price: ${item.courierPrice}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
