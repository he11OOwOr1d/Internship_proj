import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useKindeAuth } from "@kinde-oss/kinde-auth-react"
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react"
import { APP_LOGO } from "../utils/constants"
import useOnlineStatus from "../utils/useOnlineStatus"
import LoginButton from "./sign-in"
import RegisterButton from "./signup"

export default function Header() {
  const online = useOnlineStatus()
  const cartItems = useSelector((store) => store.cart.items)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useKindeAuth()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  className="h-10 w-auto rounded-full shadow-lg transition-transform hover:scale-105 duration-300"
                  src={APP_LOGO}
                  alt="Food Delivery Logo"
                />
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLinks online={online} cartItems={cartItems} />
              </div>
            </div>
          <div className="hidden md:block">
            <AuthButtons 
              isAuthenticated={isAuthenticated} 
              user={user} 
              logout={logout} 
              isUserMenuOpen={isUserMenuOpen}
              toggleUserMenu={toggleUserMenu}
            />
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 flex justify-center space-y-1 sm:px-3">
            <NavLinks online={online} cartItems={cartItems} />
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <AuthButtons 
              isAuthenticated={isAuthenticated} 
              user={user} 
              logout={logout} 
              isUserMenuOpen={isUserMenuOpen}
              toggleUserMenu={toggleUserMenu}
            />
          </div>
        </div>
      )}
    </header>
  )
}

function NavLinks({ online, cartItems }) {
  return (
    <>
      <OnlineStatus online={online} />
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contactus">Contact Us</NavLink>
      <NavLink to="/cart">
        <ShoppingCart className="inline-block mr-2 h-5 w-5" />
        Cart ({cartItems.length})
      </NavLink>
    </>
  )
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-white hover:bg-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 block"
    >
      {children}
    </Link>
  )
}

function OnlineStatus({ online }) {
  return (
    <div className="flex items-center space-x-2 px-3 py-2">
      <span className={`w-2 h-2 rounded-full ${online ? "bg-green-400" : "bg-red-400"} animate-pulse`} />
      <span className="text-white text-sm font-medium">{online ? "Online" : "Offline"}</span>
    </div>
  )
}

function AuthButtons({ isAuthenticated, user, logout, isUserMenuOpen, toggleUserMenu }) {
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  if (isAuthenticated) {
    return (
      <div className="relative">
        <button
          onClick={toggleUserMenu}
          className="flex items-center text-white hover:bg-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
        >
          <User className="mr-2 h-4 w-4" />
          {user.given_name || "User"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                role="menuitem"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-1 md:space-y-0 md:space-x-2">
      <LoginButton />
      <RegisterButton />
    </div>
  )
}