import styles from "../../../styles/style"
import ProductCard from "../ProductCard/ProductCard"
import { useSelector } from "react-redux"
import { AiOutlineShoppingCart } from "react-icons/ai"

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.product)

  return (
    <div className={`${styles.section}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Handpicked products that showcase quality, innovation, and style
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {allProducts && allProducts.length !== 0 && (
          <>{allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)}</>
        )}
      </div>

      {(!allProducts || allProducts.length === 0) && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AiOutlineShoppingCart size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products available</h3>
          <p className="text-gray-600">New products coming soon!</p>
        </div>
      )}
    </div>
  )
}

export default FeaturedProduct
