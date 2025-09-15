import { useState } from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import Navbar from "./Navbar.jsx";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";
import logo from "../../assets/logo.png";

function Header({ activeHeading }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { isSeller } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;

    setSearchTerm(term);

    const filteredProduct =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProduct);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 shadow-sm">
        <div className={`${styles.section}`}>
          <div className="hidden 800px:h-[80px] 800px:py-4 800px:flex items-center justify-between">
            <div className="w-[145px]">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>

            <div className="flex-1 max-w-2xl mx-8 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full h-12 pl-4 pr-12 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                />
                <AiOutlineSearch
                  size={20}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-500"
                />
              </div>

              {searchData && searchData.length !== 0 ? (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-50 max-h-96 overflow-y-auto">
                  {searchData &&
                    searchData.map((i, index) => {
                      return (
                        <Link to={`/product/${i._id}`} key={index}>
                          <div className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-50 last:border-b-0">
                            <img
                              src={`${i.images[0]?.url}`}
                              alt=""
                              className="w-12 h-12 object-cover rounded-lg mr-3"
                            />
                            <h1 className="text-gray-700 font-medium">
                              {i.name}
                            </h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null}
            </div>

            <div className="flex items-center mr-5">
              <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 shadow-md hover:shadow-lg">
                  <span>{isSeller ? "Go Dashboard" : "Become Seller"}</span>
                  <IoIosArrowForward className="w-4 h-4" />
                </button>
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <div
                className="relative cursor-pointer group"
                onClick={() => setOpenWishList(true)}
              >
                <AiOutlineHeart
                  size={26}
                  className="text-white/80 group-hover:text-white group-hover:scale-110"
                />
                <span className="absolute -right-2 -top-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist && wishlist.length}
                </span>
              </div>

              <div
                className="relative cursor-pointer group"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={26}
                  className="text-white/80 group-hover:text-white group-hover:scale-110"
                />
                <span className="absolute -right-2 -top-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart && cart.length}
                </span>
              </div>

              <div className="relative cursor-pointer">
                {isAuthenticated ? (
                  <Link to="/profile" className="block">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-9 h-9 rounded-full border-2 border-white/20 hover:border-white/40 object-cover"
                      alt="Profile"
                    />
                  </Link>
                ) : (
                  <Link to="/login" className="group">
                    <CgProfile
                      size={26}
                      className="text-white/80 group-hover:text-white group-hover:scale-110"
                    />
                  </Link>
                )}
              </div>

              {/* cart popup */}
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

              {/* WishList popup */}
              {openWishList ? (
                <Wishlist setOpenWishList={setOpenWishList} />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          active
            ? "bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg fixed top-0 left-0 z-50 h-[60px]"
            : ""
        } hidden 800px:flex items-center justify-between w-full h-[50px] border-b border-slate-700 bg-[#232F3E]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          <div onClick={() => setDropDown(!dropdown)}>
            <div className="relative h-[30px]  w-[205px] hidden 1000px:block">
              <div className="h-full w-full flex items-center pl-4 pr-12 bg-white hover:bg-gray-50 font-medium text-gray-700 select-none rounded-lg cursor-pointer shadow-sm border border-gray-200">
                <BiMenuAltLeft className="mr-3 text-gray-600" size={24} />
                <span>All Categories</span>
                <IoIosArrowDown
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                  size={18}
                />
              </div>
              {dropdown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>

          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          {active && (
            <div className="flex items-center space-x-6">
              <div
                className="relative cursor-pointer group"
                onClick={() => setOpenWishList(true)}
              >
                <AiOutlineHeart
                  size={26}
                  className="text-white/80 group-hover:text-white group-hover:scale-110"
                />
                <span className="absolute -right-2 -top-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist && wishlist.length}
                </span>
              </div>

              <div
                className="relative cursor-pointer group"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={26}
                  className="text-white/80 group-hover:text-white group-hover:scale-110"
                />
                <span className="absolute -right-2 -top-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart && cart.length}
                </span>
              </div>

              <div className="relative cursor-pointer">
                {isAuthenticated ? (
                  <Link to="/profile" className="block">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-9 h-9 rounded-full border-2 border-white/20 hover:border-white/40 object-cover"
                      alt="Profile"
                    />
                  </Link>
                ) : (
                  <Link to="/login" className="group">
                    <CgProfile
                      size={26}
                      className="text-white/80 group-hover:text-white group-hover:scale-110"
                    />
                  </Link>
                )}
              </div>

              {/* cart popup */}
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

              {/* WishList popup */}
              {openWishList ? (
                <Wishlist setOpenWishList={setOpenWishList} />
              ) : null}
            </div>
          )}
        </div>
      </div>

      <div
        className={`${
          active === true ? "shadow-lg fixed top-0 left-0 z-50" : ""
        }
      w-full h-[70px] bg-white z-50 top-0 left-0  800px:hidden bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 shadow-sm`}
      >
        <div className="w-full flex items-center justify-between px-4 h-full">
          <div>
            <BiMenuAltLeft
              size={28}
              className="text-white/80 group-hover:text-white group-hover:scale-110 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </Link>
          </div>
          <div>
            <div
              className="relative cursor-pointer group"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart
                size={26}
                className="text-white/80 group-hover:text-white group-hover:scale-110"
              />
              <span className="absolute -right-2 -top-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart && cart.length}
              </span>
            </div>
          </div>

          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishList ? <Wishlist setOpenWishList={setOpenWishList} /> : null}
        </div>

        {open && (
          <div className="fixed w-full bg-black/50 backdrop-blur-sm z-50 h-full top-0 left-0">
            <div className="fixed w-[85%] max-w-sm border-b text-white border-slate-700 bg-[#232F3E] h-screen top-0 left-0 z-50 overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div
                  className="relative cursor-pointer"
                  onClick={() => setOpenWishList(true) || setOpen(false)}
                >
                  <AiOutlineHeart
                    size={24}
                    className="text-white/80 group-hover:text-white group-hover:scale-110"
                  />
                  <span className="absolute -right-2 -top-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist && wishlist.length}
                  </span>
                </div>
                <RxCross1
                  size={24}
                  className="text-white/80 group-hover:text-white group-hover:scale-110 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="p-4">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="w-full h-12 pl-4 pr-12 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <AiOutlineSearch
                    size={20}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>

                {searchData && searchData.length > 0 && (
                  <div className="mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-64 overflow-y-auto">
                    {searchData.map((i, index) => {
                      return (
                        <Link to={`/product/${i._id}`} key={index}>
                          <div className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0">
                            <img
                              src={i.image_Url?.[0]?.url || i.images?.[0]?.url}
                              alt=""
                              className="w-10 h-10 object-cover rounded-lg mr-3"
                            />
                            <h5 className="text-gray-700 font-medium text-sm">
                              {i.name}
                            </h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="px-4">
                <Navbar active={activeHeading} />
              </div>

              <div className="px-4 py-4">
                <Link to="/shop-create">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2">
                    <span>Become Seller</span>
                    <IoIosArrowForward className="w-4 h-4" />
                  </button>
                </Link>
              </div>

              <div className="flex justify-center py-6 border-t border-gray-100 mt-4">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt="Profile"
                        className="w-16 h-16 rounded-full border-4 border-blue-100 object-cover"
                      />
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Login
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link
                      to="/sign-up"
                      className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
