import { useEffect, useState } from "react";
import styles from "../../../styles/style";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  useEffect(() => {
    const d =
      allProducts &&
      [...allProducts].sort((a, b) => b.total_sell - a.total_sell);
    const firstFive = d.slice(0, 5);
    setData(firstFive);
  }, []);

  return (
    <div className={`${styles.section}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Deals</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our most popular products with the best prices and highest
          customer satisfaction
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data && data.length !== 0 && (
          <>
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </>
        )}
      </div>

      {(!data || data.length === 0) && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AiOutlineShoppingCart size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No deals available
          </h3>
          <p className="text-gray-600">Check back later for amazing deals!</p>
        </div>
      )}
    </div>
  );
};

export default BestDeals;
