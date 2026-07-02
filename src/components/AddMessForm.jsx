import React, { useEffect, useState } from "react";
import api from "../services/api";

function AddMessForm({ onMessAdded, editingMess, setEditingMess }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    rating: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Edit mode me form auto fill hoga
  useEffect(() => {
    if (editingMess) {
      setFormData({
        name: editingMess.name,
        location: editingMess.location,
        price: editingMess.price,
        rating: editingMess.rating,
      });
    }
  }, [editingMess]);

  // Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Price Validation
    if (parseInt(formData.price) < 1000) {
      setError("Price must be at least ₹1000");
      return;
    }

    try {
      if (editingMess) {
        // UPDATE API
        await api.put(`/messes/${editingMess.id}`, {
          name: formData.name,
          location: formData.location,
          price: parseInt(formData.price),
          rating: parseFloat(formData.rating),
        });

        setMessage("✅ Mess updated successfully!");
      } else {
        // CREATE API
        await api.post("/messes", {
          name: formData.name,
          location: formData.location,
          price: parseInt(formData.price),
          rating: parseFloat(formData.rating),
        });

        setMessage("✅ Mess added successfully!");
      }

      // Reset Form
      setFormData({
        name: "",
        location: "",
        price: "",
        rating: "",
      });

      if (setEditingMess) {
        setEditingMess(null);
      }

      if (onMessAdded) {
        onMessAdded();
      }
    } catch (err) {
      setError("❌ Failed to save mess.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        {editingMess ? "✏️ Update Mess" : "➕ Add New Mess"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block font-medium mb-2">Mess Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Mess Name"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-2">Location</label>

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Location</option>
            <option value="Indore">Indore</option>
            <option value="Bhopal">Bhopal</option>
            <option value="Pune">Pune</option>
            <option value="Khandwa">Khandwa</option>
            <option value="Ujjain">Ujjain</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-2">Monthly Price (₹)</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Monthly Price"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block font-medium mb-2">Rating</label>

          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            step="0.1"
            placeholder="Enter Rating"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {editingMess ? "✏️ Update Mess" : "➕ Add Mess"}
        </button>

        {editingMess && (
          <button
            type="button"
            onClick={() => {
              setEditingMess(null);

              setFormData({
                name: "",
                location: "",
                price: "",
                rating: "",
              });
            }}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Success */}
      {message && (
        <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
      )}

      {/* Error */}
      {error && (
        <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}

export default AddMessForm;
