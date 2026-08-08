import AppName from "./Comp/AppName";
import AddTodo from "./Comp/AddTodo";
import Item from "./Comp/Item";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import style from "./Comp/AppName.module.css"

function App() {
  const todoarr = [
    {
      TodoName: "milk",
      TodoDate: "2/5/2026",
    },
    {
      TodoName: "food",
      TodoDate: "4/7/2026",
    },
    {
      TodoName: "travel",
      TodoDate: "3/8/2026",
    },
    {
      TodoName: "party",
      TodoDate: "19/9/2026",
    },
     {
      TodoName: "Tv",
      TodoDate: "1/9/2026",
    },
  ];

  return (
    <center className="todo-container">
      <AppName />
      <AddTodo />

      <div className="items-container">
        {todoarr.map((item) => (
          <Item
            key={item.TodoName}
            todoName={item.TodoName}
            todoDate={item.TodoDate}
          />
        ))}
      </div>
    </center>
  );
}

export default App;