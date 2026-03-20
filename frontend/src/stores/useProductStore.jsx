import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axiosInstance";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products/create", productData);

      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product Created")
    } catch (error) {
      toast.error(error.message), set({ loading: false });
    }
  },
  fetchFeaturedProducts:async ()=>{
    set({loading:true})
    try {
      const response = await axios.get("/products/featured")
      set({products:response.data, loading:false})
      
    } catch (error) {
      set({loading:false})
      console.log("error in fetcing featured products", error.messsage)
      toast.error(error?.response?.data?.message)
    }
  },
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      set({ products: res.data.product, loading: false });
    } catch (error) {
      console.log(error.message, "message from fetching products");
      toast.error(error.response.data.message);
    }
  },
  
  getProductsByCategory: async(category)=>{
    set({loading:true})

    try {
        const res = await axios.get (`/products/category/${category}`)
        set({products:res.data.products, loading:false})
        console.log("get Item by category", res.data)
    } catch (error) {
        toast.error(error.message)
        console.log("error from get Products by category")
    }
  },

  toggleFeaturedProducts: async (productId) => {
    set({ loading: true });

    try {
      const res = await axios.patch(`/products/${productId}`);

      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: res.data.isFeatured }
            : product,
        ),
        loading: false,
      }));
    } catch (error) {
      console.log("error from toggle feature", error.message);
      set({ loading: false });
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true });

    try {
      await axios.delete(`/products/${id}`);

      set((prevProducts) => ({
        products: prevProducts.products.filter((product) => product._id !== id),
        loading: false,
      }));

      toast.success("product deleted");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.error || "might be a problem in deleting",
      );
      console.log(error.message);
    }
  },
}));
