import { create } from "zustand";
import axios from "../lib/axiosInstance";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  total: 0,
  subTotal: 0,
  coupon: null,
  isCouponApplied: false,

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");

      set({ cart: res.data });
      get().calculateTotal();
    } catch (error) {
      set({ cart: [] });
      toast.error("Error in fetching cart Items", { id: "name" });
    }
  },
  addItemsToCart: async (product) => {
    try {
      const res = await axios.post("/cart", { productId: product._id });

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id,
        );
        const newItem = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...prevState.cart, { ...product, quantity: 1 }];

        return { cart: newItem };
      });
      get().calculateTotal();
    } catch (error) {
      toast.error(
        error.response ||
          "Error (USER CART STORE) occured while adding product to the cart.....",
        error.message,
      );
    }
  },

  removeFromCart: async (productId) => {
    try {
       const res = await axios.delete(`/cart`, { data: { productId } });
    set((prevState) => ({
      cart: prevState.cart.filter((item) => item._id !== productId),
    }));
    get().calculateTotal();
    } catch (error) {
      toast.error(error?.response?.data?.message ||  "Failed to remove")
    }
   
  },
  clearCart: async () => {
    try {
      await axios.delete(`/cart/clear-all`);
      set({ cart: [], coupon: null });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error from clearCart function",
      );
    }
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }
    try {
      const res = await axios.put(`/cart/${productId}`, { quantity });

      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item._id === productId ? { ...item, quantity: quantity } : item,
        ),
      }));
      get().calculateTotal();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update quantity",
      );
    }
  },

  getCoupon: async () => {
    try {
      const res = await axios.get("/coupons");
      set({ coupon: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to Fetch coupons");
    }
  },
  applyCoupon: async (code) => {
    try {
      const res = await axios.post("/coupons/validate", { code: code });
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotal();
      toast.success("Coupon Applied Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to apply coupon");
    }
  },
  removeCoupon: async () => {
    try {
      set({ coupon: null, isCouponApplied: false });
      get().calculateTotal();
      toast.success("Coupon Removed");
    } catch (error) {
      toast.error(error.message);
    }
  },

  calculateTotal: () => {
    const { cart, coupon } = get();
    const subTotal = cart.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    let total = subTotal;

    if (coupon) {
      const discount = subTotal * (coupon.discount / 100);
      total = subTotal - discount;
    }
    set({ total, subTotal });
  },
}));
