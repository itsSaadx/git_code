import style from "./Item.module.css"
const Item = ({ item, bought, handleBuyButton }) => {
  return (
    <li
      className={`list-group-item ${bought ? "active" : ""}`}
    >
      <span>{item}</span>

      <button
        className={`${style.btn} btn btn-info `} 
        onClick={handleBuyButton}
      >
        Buy
      </button>
    </li>
  );
};

export default Item;