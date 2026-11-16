"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addtodo } from "../redux/todoslice";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (!todo.trim()) return;

    dispatch(addtodo(todo));
    setTodo("");
  };

  return (
    <div className="user-box">
      <h3>Add Todo</h3>

      <input
        type="text"
        placeholder="Enter todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button className="todobtn" onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default AddTodo;