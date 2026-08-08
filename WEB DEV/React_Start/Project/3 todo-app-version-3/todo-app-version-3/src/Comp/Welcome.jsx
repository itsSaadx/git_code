import { useContext } from "react";
import { TodoItemContext } from "../store/todo-item-store";

function Welcome() {
  const { todo } = useContext(TodoItemContext);

  return todo.length === 0 && <h1>Enjoy your day</h1>;
}

export default Welcome;