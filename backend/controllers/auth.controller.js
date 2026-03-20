import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redis } from "../lib/redis.js";
import {generateTokens,saveRefreshToken,setCookies} from "../lib/tokens.js"

dotenv.config();



export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const existingEmail = await User.findOne({ email });

  try {
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "user email already exist , try with new one" });
    }
    if(password.length <6 ){
      return res.status(400).json({message:"password should be atleast 6 characters"})
    }
    const user = await User.create({ email, password, name });
    

    const { accessToken, refreshToken } = await generateTokens(user._id);
    await saveRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        mail: user.email,
        role: user.role,
      },

      message: "user created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error from signup controller ", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } =await generateTokens(user._id);
      await saveRefreshToken(user._id, refreshToken);
     setCookies(res, accessToken, refreshToken);
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
         message:"logged in successfully"
      });
    } else {
      res.status(400).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
   
    res.status(500).json({message:"error form login controller" ,Error:error.message})
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const encoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${encoded.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error ", Error: error.message });
  }
};


export const refreshAccessToken =async(req,res) =>{
  try {
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){

     return  res.status(401).json({message:"No refresh token provided"})
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    const savedToken= await redis.get(`refresh_token:${decoded.userId}`)


    if(savedToken !== refreshToken){
     return  res.status(401).json({message:"Invalid refresh token"})
    }
   const user = await User.findById(decoded.userId).select("-password")
    const accessToken = jwt.sign({userId:decoded.userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})

    res.cookie("accessToken",accessToken,{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:"strict",
      maxAge:15*60*1000
    })
   return res.json({message:"Token refreshed successfully"})
  } catch (error) {
   return res.status(500).json({message:"Server Error", Error:error.message})
  }
}

export const getProfile = (req,res)=>{
  try {
    res.json(req.user)
  } catch (error) {
    console.log("error from getProfile controller",error.message)
    res.status(500).json({message:"server error",Error:error.message})
  }
}