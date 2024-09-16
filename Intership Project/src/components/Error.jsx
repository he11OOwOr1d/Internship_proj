import React from "react";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">
          {err.status}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {err.statusText || "Something went wrong!"}
        </h2>
        <p className="text-gray-500 mb-8">
          Oops! It looks like something went wrong. Don't worry, you can go back to the homepage and try again.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
