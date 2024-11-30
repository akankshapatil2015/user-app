import React from "react";

function Header({ searchQuery, setSearchQuery }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name or email..."
        className="p-2 border rounded w-full"
      />
    </div>
  );
}

export default Header;
