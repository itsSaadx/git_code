import { useSelector } from "react-redux";


const BagSummary = ()=>{

  const bag = useSelector((store) => store.bag);
  const items = useSelector((store) => store.items);

  // Get complete product objects that are in the bag
  const bagItems = items.filter((item) => bag.includes(item.id));

  // Total MRP
  const totalMRP = bagItems.reduce(
    (total, item) => total + item.original_price,
    0
  );

  // Discount on MRP
  const discount = bagItems.reduce(
    (total, item) => total + (item.original_price - item.current_price),
    0
  );

  // Convenience Fee
  const convenienceFee = 99;

  // Final amount
  const totalAmount = totalMRP - discount + convenienceFee;


    return (
         <div className="bag-summary">
       
     <div className="bag-details-container">
    <div className="price-header">PRICE DETAILS ({bagItems.length} Items) </div>
    <div className="price-item">
      <span className="price-item-tag">Total MRP</span>
      <span className="price-item-value">₹{totalMRP}</span>
    </div>
    <div className="price-item">
      <span className="price-item-tag">Discount on MRP</span>
      <span className="price-item-value priceDetail-base-discount">-₹{discount}</span>
    </div>
    <div className="price-item">
      <span className="price-item-tag">Convenience Fee</span>
      <span className="price-item-value">{convenienceFee}</span>
    </div>
    <hr/>
    <div className="price-footer">
      <span className="price-item-tag">Total Amount</span>
      <span className="price-item-value">₹{totalAmount}</span>
    </div>
  </div>
  <button className="btn-place-order">
    <div className="css-xjhrni">PLACE ORDER</div>
  </button>   
 </div>
    )
} 

export default BagSummary;