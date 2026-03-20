import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axiosInstance.js";
import axiosInstance from "../lib/axiosInstance.js";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: false,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password != confirmPassword) {
      set({ loading: false });

      return toast.error("password and confirm password should be same");
    }
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      toast.success(res?.data?.message);
      set({ user: res?.data, loading: false });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      set({ loading: false });
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res?.data, loading: false });
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const res = await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },

  authenticationCheck: async () => {
    set({ checkingAuth: true });

    const timeout = setTimeout(()=>{
      set({checkingAuth:false})
    },3000)
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res?.data, checkingAuth: false });
      clearTimeout(timeout)
    } catch (error) {
      toast.error(error?.response?.data?.message);
      set({ user: null, checkingAuth: false });
      clearTimeout(timeout)
    }
  },
  refreshToken: async () => {
    // if(get().checkingAuth) return ;
    set({ checkingAuth: true });

    try {
      const response = await axios.post("/auth/refresh-token");
      set({ user: response.data.user, checkingAuth: false });
      console.log("refreshtoken onClick response ", response.data.user);
      return response.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      toast.error(error?.response?.data?.message);
      console.log("error from user store refreshToken", error.message);
      throw error;
    }
  },
}));

let refreshPromise = null;
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (!refreshPromise) {
          refreshPromise = useUserStore.getState().refreshToken();
        }

        await refreshPromise;
        refreshPromise = null;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        //if refresh fails, redirect to login to handle  as needed
        refreshPromise = null;
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
