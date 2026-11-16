import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  userAPIData: [],
  users: [],
  isLoading: false,
  error: null
};

// Fake API
export const fetchApiUsers = createAsyncThunk(
  "users/fetchApiUsers",
  async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!result.ok) {
      throw new Error("Failed to fetch users");
    }

    return result.json();
  }
);

const Slice = createSlice({
  name: "addUserSlice",
  initialState,

  reducers: {
    addUser: (state, action) => {
      const data = {
        id: nanoid(),
        name: action.payload
      };

      state.users.push(data);
    },

    removeUser: (state, action) => {
      state.users = state.users.filter(
        (item) => item.id !== action.payload
      );
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchApiUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchApiUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userAPIData = action.payload;
      })

      .addCase(fetchApiUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { addUser, removeUser } = Slice.actions;

export default Slice.reducer;