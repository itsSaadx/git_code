import AppName from "./Comp/AppName";
import AddTodo from "./Comp/AddTodo";
import Item from "./Comp/Item";
import Welcome from "./Comp/Welcome";

import TodoItemContextProvider from "./store/todo-item-store";
import { TodoItemContext } from "./store/todo-item-store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { useContext } from "react";

function TodoItems() {
  const { todo } = useContext(TodoItemContext);

  return (
    <>
      {todo.map((item) => (
        <Item
          key={item.TodoName}
          todoName={item.TodoName}
          todoDate={item.TodoDate}
        />
      ))}
    </>
  );
}

function App() {
  return (
    <TodoItemContextProvider>
      <center className="todo-container">
        <AppName />

        <AddTodo />

        <div className="items-container">
          <TodoItems />

          <Welcome />
        </div>
      </center>
    </TodoItemContextProvider>
  );
}

export default App;