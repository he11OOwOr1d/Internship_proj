import React from "react"
import { useKindeAuth } from "@kinde-oss/kinde-auth-react"
import { LogIn } from "lucide-react"

const LoginButton = () => {
  const { login } = useKindeAuth()

  return (
    <button
      onClick={login}
      type="button"
      className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
    >
      <LogIn className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
      Log In
    </button>
  )
}

export default LoginButton