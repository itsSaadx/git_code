import { createContext, useReducer, useRef } from "react";

export const TodoItemContext = createContext();

const todoarr = [
  { TodoName: "party", TodoDate: "19/9/2026" },
  { TodoName: "Tv", TodoDate: "1/9/2026" },
];

function todoReducer(currentTodo, action) {
  if (action.type === "ADD") {
    return [...currentTodo, action.payload];
  }

  if (action.type === "DELETE") {
    return currentTodo.filter(
      (item) => item.TodoName !== action.payload
    );
  }

  return currentTodo;
}

function TodoItemContextProvider({ children }) {
  const [todo, dispatch] = useReducer(todoReducer, todoarr);

  const todoNameElement = useRef();
  const todoDateElement = useRef();

  const handleAdd = (event) => {
    event.preventDefault();

    const newTodo = {
      TodoName: todoNameElement.current.value,
      TodoDate: todoDateElement.current.value,
    };

    dispatch({
      type: "ADD",
      payload: newTodo,
    });

    todoNameElement.current.value = "";
    todoDateElement.current.value = "";
  };

  const handleDelete = (todoName) => {
    dispatch({
      type: "DELETE",
      payload: todoName,
    });
  };

  return (
    <TodoItemContext.Provider
      value={{
        todo,
        handleAdd,
        handleDelete,
        todoNameElement,
        todoDateElement,
      }}
    >
      {children}
    </TodoItemContext.Provider>
  );
}

export default TodoItemContextProvider;