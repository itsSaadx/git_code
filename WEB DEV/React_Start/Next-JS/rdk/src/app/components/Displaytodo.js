"use client";

import { useSelector } from "react-redux";

const DisplayTodo = () => {
  const todos = useSelector((data) => data.tododata.todo);

  console.log(todos);

  return (
    <div className="user-box">
      <h3>Todo List</h3>

      {todos.map((item) => (
        <div key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default DisplayTodo;