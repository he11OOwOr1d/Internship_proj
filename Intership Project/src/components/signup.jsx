import React from "react"
import { useKindeAuth } from "@kinde-oss/kinde-auth-react"
import { UserPlus } from "lucide-react"

const RegisterButton = () => {
  const { register } = useKindeAuth()

  return (
    <button
      onClick={register}
      type="button"
      className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
    >
      <UserPlus className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
      Register
    </button>
  )
}

export default RegisterButton