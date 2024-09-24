import React from 'react';
import { RES_IMAGE } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../utils/cartSlice';

export default function ItemsList({ items }) {
  const dispatch = useDispatch();
  
  // Get the cart from Redux state
  const cart = useSelector((state) => state.cart);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Get the quantity of a specific item from the cart
  const getItemQuantity = (itemId) => {
    const cartItem = cart.items.find((cartItem) => cartItem.card.info.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-4 m-2 border rounded-lg shadow-lg flex flex-col items-start"
        >
          <div className="w-full flex-grow">
            <span className="font-semibold">{item.card.info.name}</span>
            <span>
              {' '}
              - Rs.{' '}
              {item.card.info.price 
                ? item.card.info.price / 100
                : item.card.info.defaultPrice / 100}
            </span>
            <p className="text-xs my-2">{item.card.info.description}</p>
          </div>
          <img
            src={RES_IMAGE + item.card.info.imageId}
            alt={item.card.info.name}
            className="w-1/4 mb-2 flex"
          />
          <div className="flex gap-2 w-full items-center">
            <button 
              className="p-1 px-2 text-xs rounded-lg bg-black text-white shadow-sm hover:bg-gray-800"
              onClick={() => handleAddItem(item)}
            >
              Add +
            </button>
            <span className="text-sm font-semibold">
              Quantity: {getItemQuantity(item.card.info.id)}
            </span>
            <button 
              className="p-1 px-2 text-xs rounded-lg bg-red-600 text-white shadow-sm hover:bg-red-800"
              onClick={() => handleRemove(item)}
            >
              Remove
            </button>
            {/* Display the quantity of the item */}
           
          </div>
        </div>
      ))}
    </div>
  );
}
