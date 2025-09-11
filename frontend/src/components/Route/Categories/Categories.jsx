import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/style";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
          {brandingData &&
            brandingData.map((i, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-50 rounded-xl text-blue-600">
                    {i.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">
                      {i.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {i.Description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className={`${styles.section}`} id="categories">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Explore our diverse range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-8">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  key={i.id}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
                  onClick={() => handleSubmit(i)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors flex items-center justify-center overflow-hidden">
                      <img
                        src={i.image_Url || "/placeholder.svg"}
                        className="w-16 h-16 object-cover group-hover:scale-110 transition-transform"
                        alt={i.title}
                      />
                    </div>
                    <h5 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {i.title}
                    </h5>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
