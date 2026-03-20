import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No access token provided" });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }
      req.user = user;

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
       return res.status(401).json({ message: "unauthorized , token got expired" });
      }
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  } catch (error) {
    console.log("Error from protectRoute middleware", error.message);
    res.status(500).json({ message: "server error", Error: error.message });
  }
};

export const adminRoute = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      return next();
    }
    return res.status(403).json({ message: "Access denied. Admin-only" });
  } catch (error) {
    res.status(500).json({
      message: "server error from auth middleware",
      Error: error.message,
    });
  }
};
