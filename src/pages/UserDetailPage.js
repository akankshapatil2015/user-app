import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UserDetailPage() {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.user.users.find((user) => user.id === parseInt(id))
  );

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <Link to="/" className="text-blue-500">
        Back to List
      </Link>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company.name}</p>
      <p>Address: {`${user.address.street}, ${user.address.city}`}</p>
    </div>
  );
}

export default UserDetailPage;
