import React from "react";

function MessCard({ mess, onEdit, onDelete }) {
  console.log(onEdit);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">
      {/* Mess Name */}
      <h2 className="text-2xl font-bold text-blue-700 mb-5">🍽️ {mess.name}</h2>

      {/* Details */}
      <div className="space-y-4">
        <div className="flex justify-between border-b pb-3">
          <span className="text-gray-500 font-medium">📍 Location</span>
          <span className="font-semibold text-gray-800">{mess.location}</span>
        </div>

        <div className="flex justify-between border-b pb-3">
          <span className="text-gray-500 font-medium">💰 Monthly Price</span>
          <span className="font-semibold text-green-600">₹ {mess.price}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">⭐ Rating</span>
          <span className="font-semibold text-yellow-500">
            {mess.rating} / 5
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={() => onEdit(mess)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(mess.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-medium transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MessCard;
