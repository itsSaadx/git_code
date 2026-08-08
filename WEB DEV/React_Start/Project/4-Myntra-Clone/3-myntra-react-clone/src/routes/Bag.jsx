import Header from "../components/Header";
import Footer from "../components/Footer";
import BagSummary from "../components/BagSummary";
import BagItem from "../components/BagItem";
import { useSelector } from "react-redux";


const Bag = ()=>{
  const Items = useSelector(store => store.items); // items array
  const bag = useSelector(store => store.bag); // bag array

  const bagItems = Items.filter(item => bag.includes(item.id)); // new array

return(
    <main>
      <div className="bag-page">
      <div className="bag-items-container">
        {
            bagItems.map(item => (
              <BagItem key={item.id} item={item} />
            ))
          }
        </div>  
      <BagSummary/>
      </div>
    </main>
)
}

export default Bag;