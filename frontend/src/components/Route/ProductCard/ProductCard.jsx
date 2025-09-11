import { useState } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addToCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 p-4 relative cursor-pointer overflow-hidden">
        <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-50">
          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
          >
            <img
              src={`${data.images && data.images[0]?.url}`}
              alt={data.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {click ? (
              <button
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all"
                onClick={() => removeFromWishlistHandler(data)}
                title="Remove from wishlist"
              >
                <AiFillHeart size={18} className="text-red-500" />
              </button>
            ) : (
              <button
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all"
                onClick={() => addToWishlistHandler(data)}
                title="Add to wishlist"
              >
                <AiOutlineHeart
                  size={18}
                  className="text-gray-600 hover:text-red-500"
                />
              </button>
            )}

            <button
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all"
              onClick={() => setOpen(!open)}
              title="Quick view"
            >
              <AiOutlineEye
                size={18}
                className="text-gray-600 hover:text-blue-500"
              />
            </button>

            <button
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all"
              onClick={() => addToCartHandler(data._id)}
              title="Add to cart"
            >
              <AiOutlineShoppingCart
                size={18}
                className="text-gray-600 hover:text-green-500"
              />
            </button>
          </div>

          {data.originalPrice && data.discountPrice < data.originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
              {Math.round(
                ((data.originalPrice - data.discountPrice) /
                  data.originalPrice) *
                  100
              )}
              % OFF
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <p className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              {data.shop.name}
            </p>
          </Link>

          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
          >
            <h4 className="font-semibold text-gray-900 text-base leading-tight hover:text-blue-600 transition-colors line-clamp-2">
              {data.name.length > 50
                ? data.name.slice(0, 50) + "..."
                : data.name}
            </h4>

            <div className="flex items-center space-x-2 mt-2">
              <Ratings rating={data?.ratings} />
              <span className="text-xs text-gray-500">
                ({data?.numOfReviews || 0})
              </span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  $
                  {data.originalPrice === 0
                    ? data.originalPrice
                    : data.discountPrice}
                </span>
                {data.originalPrice && data.originalPrice > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    ${data.originalPrice}
                  </span>
                )}
              </div>

              {data?.sold_out > 0 && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 font-medium">
                    {data?.sold_out} sold
                  </span>
                </div>
              )}
            </div>
          </Link>
        </div>

        <button
          onClick={() => addToCartHandler(data._id)}
          className="w-full mt-4 bg-gray-900 hover:bg-black text-white py-2.5 rounded-xl font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
        >
          Add to Cart
        </button>

        {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
      </div>
    </>
  );
};

export default ProductCard;
