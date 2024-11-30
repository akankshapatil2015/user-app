import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserDetailPage from "./pages/UserDetailPage";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <a href="/" className="mr-4 text-blue-600 hover:underline">
            Home
          </a>
          <a href="/add-user" className="text-blue-600 hover:underline">
            Add User
          </a>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
