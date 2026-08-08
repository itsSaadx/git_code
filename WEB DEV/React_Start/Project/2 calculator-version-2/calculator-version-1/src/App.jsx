import style from "./App.module.css";
import Display from "./Comp/Display";
import ButtonsContainer from "./Comp/ButtonsContainer";
import { useState } from "react";

function App() {
  const [exp, setExp] = useState("");

  const onButtonClick = (btnValue) => {
    if (btnValue === "C") {
      setExp("");
    } 
    else if (btnValue === "=") {
      try {
        setExp(eval(exp));
      } catch {
        setExp("Error");
      }
    } 
    else {
      setExp(exp + btnValue);
    }
  };

  return (
    <div className={style.calculator}>
      <Display value={exp} />
      <ButtonsContainer onButtonClick={onButtonClick} />
    </div>
  );
}

export default App;