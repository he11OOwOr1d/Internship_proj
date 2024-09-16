import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import { useEffect, useState } from 'react';
import RestaurantCategory from './RestaurantCategory';

export default function RestaurantMenu() {
  const [itemCards, setItemCards] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [cuisines, setCuisines] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [costForTwoMessage, setCostForTwoMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(0);

  useEffect(() => {
    if (resInfo) {
      const restaurantInfo = resInfo?.cards[2]?.card?.card?.info || {};
      const { name, avgRating, cuisines, costForTwoMessage, price } = restaurantInfo;
      setName(name || '');
      setAvgRating(avgRating || 0);
      setPrice(price || 0);
      setCostForTwoMessage(costForTwoMessage || '');
      setCuisines(cuisines || []);
      setItemCards(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards || []);

      const filteredCategories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      ) || [];

      setCategories(filteredCategories);
      console.log(filteredCategories);
    }
  }, [resInfo]);

  if (!resInfo) {
    return <p className="text-center text-xl font-semibold text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-8 transform hover:scale-105 transition-transform duration-500">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
            {name}
          </h1>
          <p className="text-lg font-medium text-gray-700 mb-1">
            {cuisines?.join(', ')} - {costForTwoMessage}
          </p>
          <p className="mt-2 text-md font-semibold text-gray-600">
            Rating: <span className="text-green-600 text-lg">{avgRating || 'N/A'}</span>
          </p>
        </div>

        <div className="space-y-6">
          {categories.map((category, index) => (
            <RestaurantCategory
              key={index}
              data={category.card.card}
              showItems={index === showIndex}
              setShowIndex={() => setShowIndex(showIndex => index===showIndex?-1:index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
