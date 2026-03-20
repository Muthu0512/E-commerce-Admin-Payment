import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProuducts = async (req, res) => {
  try {
    const product = await Product.find({});
    res.json({ product });
  } catch (error) {
    console.log("Error from getAllProducts controller", error.message);
    res.status(500).json({ message: "Server Error", Error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("Error from Create controller", error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];

      try {
        cloudinary.cloud.destroy(`products/${publicId}`);
        console.log("cloudinary image deleted successufully");
      } catch (error) {
        console.log("Error in deleting cloudinary image", error.message);
      }

      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "product deleted successfully" });
    }
  } catch (error) {
    console.log("error in delete product controller", error.message);
    res.status(500).json({ message: "server error", Error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }
    // lean () returns the JS object instead of mongoDB document
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "product not found" });
    }

    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.log("Error from Featured Controller", error.message);
    res.status(500).json({ message: "Server", Error: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          description: 1,
          image: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.log("Error from recommended controller", error.message);
    res.stauts(500).json({ message: "Server Error", Error: error.message });
  }
};

export const getByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "not found and no itmes in this category " });
    }
    res.json({products});
  } catch (error) {
    console.log("error in getGategory controller", error.message);
    res.status(500).json({ message: "server error", Error: error.message });
  }
};

export const toogleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
    
      const updatedProduct = await product.save();
      await updateFeaturedProudctCache();
      return res.json(updatedProduct);
    }
    res.status(404).json({ message: "no products found" });
  } catch (error) {
    console.log("error in toogle featured controller", error.message);
    res.status(500).json({ message: "server error", Error: error.message });
  }
};


const updateFeaturedProudctCache = async()=>{
try {
  const updatedProduct = await Product.find({isFeatured:true}).lean()
  await redis.set("featured_products",JSON.stringify(updatedProduct))
} catch (error) {
  console.log("error in update cache",error.message)
}
}