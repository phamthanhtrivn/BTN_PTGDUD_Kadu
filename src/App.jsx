import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Products from "./pages/Products"
import About from "./pages/About"
import SidebarMenu from "./components/SidebarMenu"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import { AuthProvider } from "./context/AuthContext"
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Header />
        <SidebarMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductItem />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App