import style from "./Display.module.css";

const Display = ({ value }) => {
  return (
    <input
      className={style.display}
      type="text"
      value={value}
      readOnly
    />
  );
};

export default Display;