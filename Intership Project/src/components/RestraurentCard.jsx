import { RES_IMAGE } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo
  } = resData?.info;
  const { deliveryTime } = resData.info?.sla;

  // Truncate cuisines to a maximum of 2, adding '...' if there are more
  const displayedCuisines = cuisines.length > 2 ? cuisines.slice(0, 2).join(', ') + '...' : cuisines.join(', ');
  
  // Truncate restaurant name if it's too long (more than 20 characters)
  const displayedName = name.length > 10 ? name.slice(0, 12) + '...' : name;

  return (
    <div className="m-4 p-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-2xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-500 max-w-xs">
      {/* Image and Info Container */}
      <div className="relative w-full h-48 mb-4">
        <img
          className="w-full h-full object-cover rounded-t-lg shadow-lg transition-transform transform hover:scale-110"
          src={RES_IMAGE + cloudinaryImageId}
          alt={name}
        />
      </div>
      {/* Card Content */}
      <div className="bg-white rounded-b-lg p-4 shadow-inner flex flex-col justify-between">
        <h4 className="text-lg font-bold text-gray-800 mb-1 text-center" title={name}>{displayedName}</h4>
        <div className="flex items-center justify-center mb-2">
          <p className="bg-green-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
            {avgRating}{" "}
            <span className="ml-1">
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 25 25"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path d="M12.5 2.25l2.39 4.83 5.31.77-3.85 3.74.91 5.3-4.75-2.5-4.74 2.5.91-5.3-3.85-3.74 5.31-.77L12.5 2.25z" />
              </svg>
            </span>
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-2 text-center">{displayedCuisines || 'No cuisines listed'}</p>
        <div className="flex justify-between text-sm text-gray-800">
          <p className="font-semibold">{costForTwo || 'N/A'}</p>
          <p className="font-semibold">{deliveryTime ? `${deliveryTime} min` : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
