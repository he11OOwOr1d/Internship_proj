import { Link } from "react-router-dom";
import { APP_LOGO } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {
  const online = useOnlineStatus();
  const cartItems = useSelector((store)=>store.cart.items)
  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 lg:px-16">
        {/* Logo */}
        <div className="logo-container">
          <Link to={"/"}>
          <img
            className="w-36 h-auto rounded-full shadow-2xl transition-transform transform hover:scale-110 duration-500"
            src={APP_LOGO}
            alt="Food Delivery Logo"
          />
          </Link>
        </div>
        {/* Navigation */}
        <nav className="flex items-center">
          <ul className="flex space-x-8 text-lg font-semibold">
            <li className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${online ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
              <span className="text-white font-medium">
                {online ? "Online " : "Offline "}
              </span>
            </li>
            <li className="relative group">
    <Link
      to="/about"
      className="relative text-white transition-all duration-300 ease-in-out hover:text-gray-900 px-4 py-2 rounded-lg bg-opacity-0 hover:bg-white"
    >
      About
      <span className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </Link>
  </li>
  <li className="relative group">
    <Link
      to="/contactus"
      className="relative text-white transition-all duration-300 ease-in-out hover:text-gray-900 px-4 py-2 rounded-lg bg-opacity-0 hover:bg-white"
    >
      Contact Us
      <span className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </Link>
  </li>
  <li className="relative group">
    <Link
      to="/cart"
      className="relative text-white transition-all duration-300 ease-in-out hover:text-gray-900 px-4 py-2 rounded-lg bg-opacity-0 hover:bg-white"
    >
      Cart - {cartItems.length} items
      <span className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </Link>
  </li>
  <li className="relative group">
    <Link
      to="/signin"
      className="relative text-white transition-all duration-300 ease-in-out hover:text-gray-900 px-4 py-2 rounded-lg bg-opacity-0 hover:bg-white"
    >
      Sign In
      <span className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </Link>
  </li>
  <li className="relative group">
    <Link
      to="/signup"
      className="relative text-white transition-all duration-300 ease-in-out hover:text-gray-900 px-4 py-2 rounded-lg bg-opacity-0 hover:bg-white"
    >
      Sign Up
      <span className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </Link>
  </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
