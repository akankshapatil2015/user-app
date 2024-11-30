import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, fetchUsers } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone is required.";
    if (!formData.company) newErrors.company = "Company is required.";
    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    // Dispatch addUser action
    await dispatch(addUser(formData));

    // Fetch the updated user list from the API
    await dispatch(fetchUsers());

    alert("User added successfully!");
    setFormData({ name: "", email: "", phone: "", company: "" });
    navigate("/"); // Navigate to the homepage
  } catch (error) {
    console.error("Error adding user or fetching users:", error);
    alert("Something went wrong!");
  }
};


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "phone", "company"].map((field) => (
          <div key={field}>
            <label className="block font-medium mb-1">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
