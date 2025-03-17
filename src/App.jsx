import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import About from "./pages/About"
import SidebarMenu from "./components/SidebarMenu"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import PlaceOrder from "./pages/PlaceOrder"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./context/PrivateRoute"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import UserDetail from "./pages/UserDetail"
import Category from "./components/Category"
import Orders from "./pages/Orders"
const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Header />
        <SidebarMenu />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/user" element={<UserDetail />} />
          <Route path="/category/:id" element={<Category />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App