/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { images } from "../assets/assets";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { search, setSearch, showSearchBar, setShowSearchBar } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('products')) {
      setVisible(true)
    }
    else {
      setVisible(false)
    }
  }, [location])
  
  return showSearchBar && visible ? (
    <div className="border-gray-300 rounded-3xl mb-10 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input 
          type="text"
          placeholder="Search..." 
          className="flex-1 outline-none bg-inherit text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-4" src={images.search_icon} alt="search_icon" />
      </div>
      <button></button>
      <img onClick={() => setShowSearchBar(false)} className="inline w-3 cursor-pointer" src={images.cross_icon} alt="cross_icon" />
    </div>
  ) : null;
}

export default SearchBar