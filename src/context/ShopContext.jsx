/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const [visibleMenu, setVisibleMenu] = useState(false)
  const navigate = useNavigate()

  const currency = 'VNĐ'
  const formatMoney = (number) => {
    return Number(number).toLocaleString("vi-VN");
  };

  const value = {
    products,
    navigate,
    visibleMenu,
    setVisibleMenu,
    formatMoney,
    currency
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;