import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todo: []
};

const slice = createSlice({
  name: "todolist",
  initialState,

  reducers: {
    addtodo: (state, action) => {
      const data = {
        id: nanoid(),
        name: action.payload
      };

      state.todo.push(data);
    }
  }
});

export const { addtodo } = slice.actions;

export default slice.reducer;