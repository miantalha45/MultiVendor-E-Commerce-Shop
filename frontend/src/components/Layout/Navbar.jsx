import React from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "800px:text-white text-green-600 800px:bg-green-600 800px:rounded-full"
                  : "text-[#fff]"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer} hover:text-blue-400 transition-colors duration-200`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
