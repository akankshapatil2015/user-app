import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/userSlice";

function UserCard({ user }) {
    const dispatch = useDispatch();

    const handleRemoveUser = () => {
      dispatch(removeUser({ id: user.id }));
    };

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.company.name}</p>
      <Link to={`/user/${user.id}`} className="text-blue-500">
        View Details
      </Link>
      <button
        onClick={handleRemoveUser}
        className="m-6 px-4 py-2 bg-red-600 text-white rounded"
      >
        Remove User
      </button>
    </div>
  );
}

export default UserCard;
