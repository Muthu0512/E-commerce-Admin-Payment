import { Home,ShoppingCart, UserPlus, Lock, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import {useCartStore} from "../stores/useCartStore"
function Navbar() {
  const {user,logout} = useUserStore();
  const {cart} = useCartStore()
  const isAdmin = user?.role ==="admin";

  return (
    <header className=" top-0 left-0 w-full sticky bg-gray-900 bg-opactiy-90  backdrop-blur-md shadow-2xl  z-40 transition-all duration-300  border-b  border-emerald-800  flex justify-between items-center px-10 py-5">
      <div>
        <Link to="/" className="text-2xl md:text-3xl  text-nowrap font-semibold text-emerald-400">
          E-commerce
        </Link>
      </div>
      <nav className=" flex flex-wrap justify-evenly items-center gap-4 group ">
        <Link to="/" className="text-emerald-400 flex items-center gap-0.5 group hover:text-emerald-800 transition duration-400 ease-in-out ">
        <Home  className="size-3 sm:size-5"/>
        <span className="text-sm hidden sm:inline">Home</span>
            </Link>
        {user && (
          <Link to="/cart" className="relative flex items-center gap-1  text-emerald-400 group hover:text-emerald-800 transition duration-300 ">
            <ShoppingCart className="relative  size:3 sm:size-6  " />
            {cart.length > 0 &&<span className="absolute -top-4 -left-2 size:3 sm:size-5  bg-emerald-600/60  rounded-full  text-white text-center text-sm sm:text-xs font-bold ">
              {cart.length  }
            </span> }
            <span className="hidden sm:inline">Cart</span>
          </Link>
        )}

        {isAdmin  && user&& (
          <Link to="/admin-dashboard" className="flex items-center gap-0.5 text-emerald-400   rounded-lg group hover:text-emerald-800 transition duration-400 ease-in-out">
            <Lock className="size-3 sm:size-5" />
            <span className="hidden sm:inline"> Dashboard</span>
          </Link>
        )}

        {user ? (
          <button onClick={logout} className=" bg-red-800 rounded-lg px-2 py-1 group hover:bg-red-600 transition duration-300 ease-in-out">
            <LogOut className="size-3 sm:size-5" />
            
          </button>
        ) : (
          <>
            <Link to='/login' className=" bg-emerald-700 rounded-lg px-2 py-1 flex justify-evenly items-center gap-1 group hover:bg-emerald-900 transition duration-300 ease-in-out">
              <LogIn className="size-2 sm:size-4"></LogIn>
              <span className="text-xs sm:text-sm">Login</span>
            </Link>
            <Link to='/signup' className=" bg-emerald-700 rounded-lg px-2 py-1 flex justify-evenly items-center gap-1 group hover:bg-emerald-900 transition duration-300 ease-in">
              <UserPlus className="size-2 sm:size-4"/>
              <span  className="text-xs sm:text-sm">Signup</span>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
