import mongoose from "mongoose"


const couponSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true
       
    },
    expiryDate:{
        type:Date,
        required:true
    },
    discount:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true,
        
        
    },userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    }
},{timestamps:true})

const Coupon = mongoose.model("coupon",couponSchema)

export default Coupon