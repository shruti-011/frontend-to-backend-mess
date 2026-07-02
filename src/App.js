import React, { useState } from "react";
import AddMessForm from "./components/AddMessForm";
import MessList from "./components/MessList";

function App() {
  // List Refresh
  const [refresh, setRefresh] = useState(false);

  // Edit ke liye selected mess
  const [editingMess, setEditingMess] = useState(null);

  // Add ya Update ke baad list refresh
  const handleRefresh = () => {
    setRefresh(!refresh);
    setEditingMess(null);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto py-6">
          <h1 className="text-4xl font-bold text-center">
            🍽️ MessMate Dashboard
          </h1>

          <p className="text-center text-blue-100 mt-2">
            Manage and View Mess Listings
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Side Form */}
          <div className="lg:col-span-1 sticky top-6">
            <AddMessForm
              onMessAdded={handleRefresh}
              editingMess={editingMess}
              setEditingMess={setEditingMess}
            />
          </div>

          {/* Right Side List */}
          <div className="lg:col-span-3">
            <MessList
              refresh={refresh}
              onRefresh={handleRefresh}
              setEditingMess={setEditingMess}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
