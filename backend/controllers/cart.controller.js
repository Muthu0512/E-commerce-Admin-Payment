import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const getCartItem = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems.map(item=>item.id) } });

    const cartItems = products.map((product) => {
      
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id?.toString() === product._id.toString(),
      );
      return { ...product.toJSON(), quantity:  item?.quantity || 1 };
    });
    res.json(cartItems);
  } catch (error) {
    console.log("error from get cart controller", error.message);
    res.status(500).json({ message: "server error", Error: error.message });
  }
};

export const addItemToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id?.toString() == productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({id:productId,quantity:1})
      // user.cartItems.push({product:productId,quantity:1});
    }
    await user.save();
    console.log("user from cartcontroller", user.cartItems);
    console.log("productID cartcontroller", productId);
    res.json(user.cartItems);
  } catch (error) {
    console.log("server error from cart controller", error.message);
    res.status(500).json({ message: "server error from cart controller" });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id != productId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("error from delete cart controller", error.message);
    res.status(500).json({ message: "server error", Error: error.message });
  }
};
export const updateCart = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const user = req.user;
    const { quantity } = req.body;
    const existingItem = user.cartItems.find((item) => item.id?.toString()=== productId);
    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id?.toString() !== productId);
        await user.save();
        res.json(user.cartItems);
      }
      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "item not found" });
    }
  } catch (error) {
    console.log("error from modify cart controller", error.message);
    res.status(500).json({ message: "server error", Error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = req.user;

    user.cartItems = [];
    await user.save();
    res.json({message:"cart cleared successfully"});
  } catch (error) {
    console.log("error from clear cart controller", error.message);
    res.status(500).json({ message: "server error", Error: error.message });
  }
};
