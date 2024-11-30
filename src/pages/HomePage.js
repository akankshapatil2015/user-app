import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userSlice";
import Header from "../components/Header";
import UserCard from "../components/UserCard";

function HomePage() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  
  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user, index) => (
          <UserCard key={`${user.name}-${user.email}-${index}`} user={user} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
