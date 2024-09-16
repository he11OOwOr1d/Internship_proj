import React from 'react';
import { RES_IMAGE } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../utils/cartSlice';

export default function ItemsList({ items }) {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
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
            <p className="text-xs my-2 ">{item.card.info.description}</p>
          </div>
          <img
            src={RES_IMAGE + item.card.info.imageId}
            alt={item.card.info.name}
            className="w-1/4 mb-2 flex"  // Set width to 75% of the container
          />
          <div className="flex gap-2 w-full">
            <button 
              className="p-1 px-2 text-xs rounded-lg bg-black text-white shadow-sm hover:bg-gray-800"
              onClick={() => handleAddItem(item)}
            >
              Add +
            </button>
            <button 
              className="p-1 px-2 text-xs rounded-lg bg-red-600 text-white shadow-sm hover:bg-red-800"
              onClick={() => handleRemove(item)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
