import FoodItems from "./Comp/FoodItems";
import ErrorMessage from "./Comp/ErrorMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "./Comp/Container";
import FoodInput from "./Comp/FoodInput";
import { useState } from "react";

function App() {

let [textToShow,setTextState] = useState() 

let [fooditems,setFoodItems] = useState([
  "Salad",
  "Green Vegetabel",
  "Roti",
]); 


const onKeyDown = (event)=>{
  if(event.key === "Enter"){
    let newFoodItem = event.target.value
    event.target.value=""
    let newItems = [...fooditems,newFoodItem]
    setFoodItems(newItems)
  }
console.log(event.target.value)  
setTextState(event.target.value)
}


return (
    <>
      <Container>
      <h1 className="heading">Healthy Food</h1>
      <FoodInput handelKeyDown={onKeyDown}></FoodInput>
      <p className="text">{textToShow}</p>
      <FoodItems items={fooditems} />
      <ErrorMessage items={fooditems} />
</Container>

  {/* <Container>
  <p>Above is the list of healthy food items</p>
  </Container> */}
    </>
  )
}

export default App;