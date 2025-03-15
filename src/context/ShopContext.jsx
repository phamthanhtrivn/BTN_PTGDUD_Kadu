/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const [visibleMenu, setVisibleMenu] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [search, setSearch] = useState('')
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()
  const delivery_fee = 50000

  const currency = 'VNĐ'
  const formatMoney = (number = 0) => {
    return Number(number).toLocaleString("vi-VN");
  };

  const getCartTotalQuantity = () => {
    return cartItems.reduce((arr, cur) => {
      return arr + cur.quantity;
    }, 0)
  }

  const handleAddToCart = (productID, quantity = 1) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find((item) => item.productID === productID)
      if (existing) {
        return prevCart.map((item) => item.productID === productID ? { ...item, quantity: item.quantity + quantity } : item)
      }
      else {
        return [...prevCart, {productID, quantity}]
      }
    })
  }

  const handleUpdateQuantityCart = (productID, quantity) => {
    setCartItems((prevCart) => {
      return prevCart.map((item) => item.productID === productID ? { ...item, quantity} : item)
    })
  }

  const handleDeleteCartItem = (productID) => {
    setCartItems((prevCart) => {
      return prevCart.filter((item) => item.productID !== productID)
    })
  }

  const value = {
    products,
    navigate,
    visibleMenu,
    setVisibleMenu,
    formatMoney,
    currency,
    showSearchBar,
    setShowSearchBar,
    search,
    setSearch,
    getCartTotalQuantity,
    handleAddToCart,
    handleUpdateQuantityCart,
    handleDeleteCartItem,
    cartItems,
    delivery_fee,
    setCartItems
  }
  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;