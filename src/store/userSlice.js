import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error("Failed to fetch user data.");
  return await response.json();
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
       const maxId = state.users.reduce(
         (max, user) => Math.max(max, user.id),0);
      const newUser = {
        id: maxId + 1, // Generate a unique ID
        ...action.payload,
        address: {
          street: action.payload.street || "Unknown Street",
          city: action.payload.city || "Unknown City",
          zipcode: action.payload.zipcode || "00000",
        },
        company: { name: action.payload.company || "Unknown Company" },
      };
      state.users.push(newUser);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // Merge API data with existing state (avoids overwriting new users)
        const existingIds = new Set(state.users.map((user) => user.id));
        const uniqueFetchedUsers = action.payload.filter(
          (user) => !existingIds.has(user.id)
        );
        state.users = [...state.users, ...uniqueFetchedUsers];
        state.status = "succeeded";
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
