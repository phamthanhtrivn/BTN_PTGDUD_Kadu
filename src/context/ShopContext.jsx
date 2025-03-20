/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { token } = useAuth()
  const navigate = useNavigate();
  const delivery_fee = 50000;

  const currency = "VNĐ";
  const formatMoney = (number = 0) => {
    return Number(number).toLocaleString("vi-VN");
  };

  const calculateTotalQuantity = () => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);
  };

  const handleAddToCart = async (id, quantity = 1) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find((item) => item.id === id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { id, quantity }];
      }
    });

    if (token) {
      try {
        await axios.post(
          "http://localhost:3001/cart/add",
          { productID: id, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const handleUpdateQuantityCart = async (id, quantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );

    if (token) {
      try {
        await axios.post(
          "http://localhost:3001/cart/update",
          { productID: id, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const handleDeleteCartItem = async (id) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );

    if (token) {
      try {
        await axios.post(
          "http://localhost:3001/cart/delete",
          { productID: id },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const renderCart = async () => {
    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:3001/cart/get",
          {},
          { headers: { token } }
        );

        if (response.data.success) {
          const newCartItems = response.data.cartData.map((item) => ({
            id: item.productID,
            quantity: item.quantity,
          }));
          setCartItems(newCartItems);

          const updatedCartData = newCartItems
            .map((item) => {
              const product = products.find((product) => product.id === item.id);
              return product ? { ...product, quantity: item.quantity } : null;
            })
            .filter((item) => item !== null);

          setCartData(updatedCartData);
          calculateTotalQuantity();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  useEffect(() => {
    if (token) {
      renderCart();
    } else {
      setCartItems([]);
      setCartData([]);
      setTotalQuantity(0);
    }
  }, [token]);

  useEffect(() => {
    renderCart();
  }, []);

  useEffect(() => {
    const updatedCartData = cartItems
      .map((item) => {
        const product = products.find((product) => product.id === item.id);
        return product ? { ...product, quantity: item.quantity } : null;
      })
      .filter((item) => item !== null);

    setCartData(updatedCartData);
    calculateTotalQuantity();
  }, [cartItems, products]);

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
    totalQuantity,
    handleAddToCart,
    handleUpdateQuantityCart,
    handleDeleteCartItem,
    cartItems,
    setCartItems,
    cartData,
    setCartData,
    delivery_fee,
    token
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
