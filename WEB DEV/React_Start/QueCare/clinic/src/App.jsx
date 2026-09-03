import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="body">
      <Outlet />
    </div>
  );
}

export default App;