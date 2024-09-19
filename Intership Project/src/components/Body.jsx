import RestaurantCard from "./RestraurentCard";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useEffect, useState } from "react";
import ChromeDinoGame from 'react-chrome-dino'

const Body = () => {
  const [listOfRes, setListOfRes] = useState([]);
  const [filRes, setFilRes] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://food-server-dur9.onrender.com/api/restaurants"
    );
    const json = await data.json();

    setListOfRes(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilRes(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Looks like you are not connected to the internet</h1>
        <div className="w-full max-w-md">
          <ChromeDinoGame />
        </div>
      </div>
    );
  }

  if (listOfRes.length === 0) {
    return <h1 className="text-center text-2xl text-gray-700">Loading.......</h1>;
  }

  const handleSearch = () => {
    const searchedRes = listOfRes.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilRes(searchedRes);
  };

  return (
    <div className="bg-blue-50 max-w-screen-2xl p-4 min-h-screen flex flex-col items-center">
      {/* Search and Filter Container */}
      <div className="filter-box flex flex-col md:flex-row gap-6 mb-8 w-full max-w-3xl">
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow duration-300 ease-in-out shadow-sm"
            placeholder="Search for restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out transform"
          >
            Search
          </button>
        </div>
        <div className="flex items-center justify-center md:justify-end w-full">
          <button
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out transform"
            onClick={() => {
              const filteredRes = listOfRes.filter(
                (res) => res.info.avgRating > 4
              );
              setFilRes(filteredRes);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="res-container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl">
        {filRes.map((rest) => (
          <Link to={`/restaurantmenu/${rest.info.id}`} key={rest.info.id}>
            <RestaurantCard resData={rest} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
