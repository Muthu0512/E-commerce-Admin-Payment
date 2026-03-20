import { Upload, PlusCircle, Loader } from "lucide-react";
import React, { useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { toast } from "react-hot-toast";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "watches",
  "glasses",
  "jackets",
  "bags",
  "suits",
];

const CreateProduct = () => {
  const { createProduct, loading } = useProductStore();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createProduct(productData);

      setProductData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (error) {
      toast(error.message);
    }
  }

  function handleImage(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData({ ...productData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="bg-gray-900 my-5 overflow-hidden flex flex-col gap-4 rounded-lg max-w-2/3">
      <h5 className="text-emerald-400 text-3xl text-center px-20 py-4 ">
        Enter Product Details
      </h5>

      <div className="space-y-4 px-4 text-white w-full">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-4 ">
            <label htmlFor="name" className="text-xl">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
              className="bg-gray-700 border-none rounded-md focus:outline-none px-3 py-2 "
              required
            />
          </div>
          <div className="flex flex-col gap-2   mb-4">
            <label htmlFor="description" className="text-xl">
              Description
            </label>
            <textarea
              type="textarea"
              id="description"
              name="description"
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
              className="bg-gray-700 border-none rounded-md focus:outline-none px-3 py-4 "
              required
            />
          </div>
          <div className="flex flex-col gap-2  mb-4">
            <label htmlFor="price" className="text-xl">
              Price
            </label>
            <input
              type="Number"
              min={0}
              id="price"
              name="price"
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
              className="bg-gray-700 border-none rounded-md focus:outline-none px-3 py-2 "
              required
            />
          </div>
          <div className="flex flex-col gap-2  mb-4">
            <label htmlFor="category" className="text-xl">
              Category
            </label>
            <select
              type="option"
              id="category"
              name="category"
              value={productData.category}
              onChange={(e) =>
                setProductData({ ...productData, category: e.target.value })
              }
              className="bg-gray-700 border-none rounded-md focus:outline-none px-3 py-2 "
              required
            >
              <option value="">select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex  gap-2 my-10 bg-gray-700 px-4 py-2 rounded-md cursor-pointer w-1/2 ">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              onChange={handleImage}
              className="hidden"
            />
            <label htmlFor="image" className="text-xl ">
              <Upload className="size-5 inline-block mr-4 " /> Upload image{" "}
            </label>
            {productData.image && (
              <h2 className="text-s ">image uploaded successfully</h2>
            )}
          </div>

          <button
            type="submit"
            className="bg-emerald-800 hover:bg-emerald-600 text-white text-lg  rounded-md  my-8 px-4 py-2 w-full  flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                Loading .... <Loader className="size-8" />{" "}
              </>
            ) : (
              <>
                Create Product <PlusCircle className="size-8" />
              </>
            )}{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
