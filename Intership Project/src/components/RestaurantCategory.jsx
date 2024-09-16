import ItemsList from "./ItemsList";
import { useState } from "react";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div className="w-8/12 mx-auto my-6 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300">
      <div
        className="flex justify-between items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 cursor-pointer text-white px-6 py-4 rounded-t-lg hover:from-purple-500 hover:to-red-600 transition-colors duration-300"
        onClick={handleClick}
      >
        <span className="font-bold text-lg">
          {data.title} ({data.itemCards.length})
        </span>
        <span className={`transform transition-transform duration-300 ${showItems ? 'rotate-180' : 'rotate-0'}`}>
          ⤵️
        </span>
      </div>
      {showItems && (
        <div className="px-6 py-4 bg-gray-50">
          <ItemsList items={data.itemCards} />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
