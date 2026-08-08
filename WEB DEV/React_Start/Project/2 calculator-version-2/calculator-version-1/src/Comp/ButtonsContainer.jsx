import style from "./ButtonsContainer.module.css";

const ButtonsContainer = ({ onButtonClick }) => {
  const arrbtns = ['C','1','2','+','3','4','-','5','6','*','7','8','/','=','9','0','.'];

  return (
    <div className={style.btnsContainer}>
      {arrbtns.map((btns) => (
        <button
          key={btns}
          className={style.button}
          onClick={() => onButtonClick(btns)}
        >
          {btns}
        </button>
      ))}
    </div>
  );
};

export default ButtonsContainer;