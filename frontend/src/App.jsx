import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import CancelPage from "./pages/CancelPage.jsx";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore.jsx";
import { useCartStore } from "./stores/useCartStore.jsx";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const { user, authenticationCheck, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    authenticationCheck();
  }, [authenticationCheck]);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [getCartItems, user]);

  if (checkingAuth) {
    return (
      <div className="w-full h-screen bg-gray-800 flex items-center justify-center">
        <Loader className="size-52 animate-spin text-emerald-500" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white relative ">
      <div className="fixed  min-h-screen w-full inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_10%,rgba(10,80,60,0.3)_45%,rgba(0,0,0,0.1)_100%)]"></div>

      <div className="relative inset-0 z-50">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-dashboard"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/category/:category"
            element={user ? <CategoryPage /> : <Navigate to="/login" />}
          />
          {/* <Route path="/cart" element={checkingAuth ? null : user ? (<CartPage />) : (<Navigate to="/login" />)}/> */}
          <Route path="/cart" element={ <CartPage /> }/>
          <Route path="/payment-success" element={<SuccessPage />} />
          <Route path="/payment-cancel" element={<CancelPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster toastOptions={{ duration: 2000 }} />
      </div>
    </div>
  );
}

export default App;
