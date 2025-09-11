import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-8">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-yellow-300 font-bold">Subscribe</span> to get
          news <br />
          events and exclusive offers
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 sm:w-72 w-full py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white/95 backdrop-blur-sm shadow-lg"
          />
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 duration-300 px-6 py-3 rounded-xl text-white font-semibold md:w-auto w-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
            Subscribe
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:px-12 px-6 py-16">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center sm:items-start">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
            style={{ filter: "brightness(0) invert(1)" }}
            className="mb-4"
          />
          <p className="text-gray-300 leading-relaxed mb-6">
            The home and elements needed to create beautiful products.
          </p>
          <div className="flex items-center gap-4">
            <AiFillFacebook
              size={28}
              className="cursor-pointer text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110"
            />
            <AiOutlineTwitter
              size={28}
              className="cursor-pointer text-gray-400 hover:text-sky-400 transition-colors duration-300 hover:scale-110"
            />
            <AiFillInstagram
              size={28}
              className="cursor-pointer text-gray-400 hover:text-pink-400 transition-colors duration-300 hover:scale-110"
            />
            <AiFillYoutube
              size={28}
              className="cursor-pointer text-gray-400 hover:text-red-400 transition-colors duration-300 hover:scale-110"
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-4 font-bold text-lg text-white">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index} className="mb-2">
              <Link
                className="text-gray-300 hover:text-yellow-300 duration-300 text-sm cursor-pointer leading-6 hover:translate-x-1 inline-block transition-all"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-4 font-bold text-lg text-white">Shop</h1>
          {footercompanyLinks.map((link, index) => (
            <li key={index} className="mb-2">
              <Link
                className="text-gray-300 hover:text-yellow-300 duration-300 text-sm cursor-pointer leading-6 hover:translate-x-1 inline-block transition-all"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-4 font-bold text-lg text-white">Support</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index} className="mb-2">
              <Link
                className="text-gray-300 hover:text-yellow-300 duration-300 text-sm cursor-pointer leading-6 hover:translate-x-1 inline-block transition-all"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center pt-6 text-gray-400 text-sm pb-8 px-6">
          <span className="hover:text-gray-300 transition-colors">
            © 2024 Becodemy. All rights reserved.
          </span>
          <div className="flex justify-center gap-4">
            <Link
              to="/terms"
              className="hover:text-yellow-300 transition-colors"
            >
              Terms
            </Link>
            <span>·</span>
            <Link
              to="/privacy"
              className="hover:text-yellow-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center justify-center w-full">
            <img
              src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
              alt="Payment methods"
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
