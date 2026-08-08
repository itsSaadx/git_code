import { useContext } from "react";
import { TodoItemContext } from "../store/todo-item-store";
import style from "./Item.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";

function Item({ todoName, todoDate }) {
  const { handleDelete } = useContext(TodoItemContext);

  return (
    <div className={style.itemsContainer}>
      <div className="row kg-row">
        <div className="col-6">{todoName}</div>

        <div className="col-4">{todoDate}</div>

        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger kg-button"
            onClick={() => handleDelete(todoName)}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;