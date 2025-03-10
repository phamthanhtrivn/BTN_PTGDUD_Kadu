/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const [visibleMenu, setVisibleMenu] = useState(false)
  const navigate = useNavigate()
  const value = {
    products,
    navigate,
    visibleMenu,
    setVisibleMenu
  }
  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;