import { React, useState } from "react";
import InputForm from "../components/InputForm";
import { motion } from "framer-motion";
import { UserRoundPen, Loader, AtSign, KeySquare, MoveRight,UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import {useUserStore} from "../stores/useUserStore.jsx";

const SignUp = () => {
  const {signup,loading}=useUserStore()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleSubmit = (e) => {
    e.preventDefault();    
    signup(formData)
    setFormData({name:"",email:"",password:"",confirmPassword:""})
    
  
  };

  return (
    <div className="flex flex-col mx-10 md:mx-auto  px-4  py-10 gap-10 items-center justify-center">
      <motion.div
      
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-emerald-400 text-xl md:text-4xl">
          Create your account
        </h2>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration:0.8, delay: 0.3 }}
      >
        <div className="bg-gray-900  rounded-md shadow-teal-900 shadow-2xl">
          <form onSubmit={handleSubmit}
            className="flex flex-col gap-1 px-2 sm:px-6 py-5 space-y-2 "
            
          >
            <InputForm
              label="Full Name"
              id="name"
              type="text"
              placeholder="your name"
              icon={UserRoundPen}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <InputForm
              label="Email"
              id="email"
              type="email"
              placeholder="my@gmail.com"
              icon={AtSign}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <InputForm
              label="Password "
              id="password"
              type="password"
              placeholder="*******"
              icon={KeySquare}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <InputForm
              label="Confirm Password "
              id="confirmPassword"
              type="password"
              placeholder="*******"
              icon={KeySquare}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
             <button type="submit" className=" text-gray-700 bg-emerald-500 rounded-md mt-2 px-2 py-1 hover:bg-emerald-600 transition duration-100" disabled ={loading}>{
              loading? (<div className=" flex gap-2 items-center justify-center "><Loader className="size-4"/>Loading....</div>):(<div className=" flex  gap-2 items-center justify-center "> <UserPlus className="size-4"/> Signup</div>)
              }
              </button> 
          </form>
          

          <div className="mx-auto my-2 flex flex-col md:flex-row gap-2 items-center justify-evenly px-2 pb-5 text-xs sm:text-xl ">
              <h3 className=" text-nowrap">Already have an account ?</h3>
              <Link to={"/login"} className="flex items-center justify-center">
              <span className=" text-emerald-500   rounded-md px-2 py-1 text-xl sm:text-2xl hover:text-emerald-800 transition duration-400 ease-in-out">Login here</span>
                <MoveRight className="inline-block size-4 "/> 
              </Link>
          </div>
          
        </div>
      </motion.div>
     
    </div>
  );
};

export default SignUp;
