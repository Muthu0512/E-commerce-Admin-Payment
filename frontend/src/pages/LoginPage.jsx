import { React, useState } from "react";
import InputForm from "../components/InputForm";
import { AtSign, KeySquare, MoveRight,Loader,LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const {login,loading} = useUserStore()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
     login(formData)
    ;
  }
  return (
    <div className="flex flex-col mx-10 md:mx-auto px-auto py-10 gap-10 items-center justify-center">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-emerald-400 text-xl md:text-4xl">
          Login to your account
        </h2>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="bg-gray-900  rounded-md shadow-teal-900 shadow-2xl">
          <form onSubmit={handleSubmit}
            className="flex flex-col w-full gap-1 px-4 sm:px-14 py-5 space-y-2 "
            
          >
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
            <button type="submit" className=" text-gray-900 bg-emerald-500 rounded-md mt-2 px-2 py-1 hover:bg-emerald-600 transition duration-100" disabled ={loading}>{
              loading? (<div className=" flex gap-2 items-center justify-center "><Loader className="size-4"/>Loading....</div>):(<div className=" flex gap-2 items-center justify-center "> <LogIn className="size-4"/> Login</div>)
              }
              </button> 
          </form>
        
          <div className="mx-auto my-2 flex flex-col md:flex-row gap-2 items-center justify-evenly px-2 pb-5 text-xs sm:text-xl ">
            <h3 className="">Don't have an account ?</h3>
            <Link to={"/signup"} className="flex items-center justify-center">
              <span className="text-xl sm:text-2xl text-emerald-500 rounded-md px-2 py-1  hover:text-emerald-800 transition duration-500 ease-in-out ">
                Signup now
              </span>
              <MoveRight className="inline-block size-4" />{" "}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
