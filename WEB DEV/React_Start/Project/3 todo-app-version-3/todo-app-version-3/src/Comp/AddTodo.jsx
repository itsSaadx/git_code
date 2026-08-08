import { IoIosAddCircle } from "react-icons/io";
import { useContext } from "react";
import { TodoItemContext } from "../store/todo-item-store";

function AddTodo() {
  const {
    handleAdd,
    todoNameElement,
    todoDateElement,
  } = useContext(TodoItemContext);

  return (
    <div className="container text-center">
      <form className="row kg-row" onSubmit={handleAdd}>
        <div className="col-6">
          <input
            type="text"
            placeholder="Enter Todo Here"
            ref={todoNameElement}
          />
        </div>

        <div className="col-4">
          <input
            type="date"
            ref={todoDateElement}
          />
        </div>

        <div className="col-2">
          <button
            type="submit"
            className="btn btn-success kg-button"
          >
            <IoIosAddCircle />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;