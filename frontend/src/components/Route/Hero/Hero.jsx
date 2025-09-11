import styles from "../../../styles/style"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div
      className="relative min-h-[75vh] 800px:min-h-[85vh] w-full bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

      <div className={`${styles.section} relative z-10 w-[90%] 800px:w-[55%]`}>
        <div className="space-y-6">
          <h1 className="text-4xl leading-tight 800px:text-6xl 800px:leading-tight text-white font-bold font-sans">
            Best Collection for
            <br />
            <span className="text-blue-400">Home Decoration</span>
          </h1>

          <p className="text-lg 800px:text-xl text-gray-200 font-light leading-relaxed max-w-2xl">
            Discover our curated selection of premium home decor items that transform your space into a beautiful
            sanctuary. From modern minimalist to classic elegance.
          </p>

          <div className="pt-4">
            <Link to="/products" className="inline-block group">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                <span>Shop Now</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
