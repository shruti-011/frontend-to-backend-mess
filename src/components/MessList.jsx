import React, { useEffect, useState } from "react";
import api from "../services/api";
import Spinner from "./Spinner";
import MessCard from "./MessCard";

function MessList({ refresh, onRefresh, setEditingMess }) {
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("setEditingMess =", setEditingMess);
  // Fetch Data
  const fetchData = () => {
    setLoading(true);
    setError("");

    api
      .get("/messes")
      .then((res) => {
        setMesses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load mess data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  // =========================
  // DELETE FUNCTION
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mess?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/messes/${id}`);

      alert("✅ Mess deleted successfully!");

      if (onRefresh) {
        onRefresh();
      } else {
        fetchData();
      }
    } catch (err) {
      alert("❌ Failed to delete mess.");
    }
  };

  if (loading) return <Spinner />;

  if (error) {
    return (
      <p className="text-center text-red-600 text-lg font-semibold">{error}</p>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🍽️ Mess Listings
      </h2>

      {messes.length === 0 ? (
        <p className="text-center text-gray-500">No Messes Available.</p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {messes.map((mess) => (
            <MessCard
              key={mess.id}
              mess={mess}
              onDelete={handleDelete}
              onEdit={setEditingMess}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MessList;
