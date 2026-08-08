import { useRef } from "react";
import { useDispatch } from "react-redux";

const Controls = ()=>{
const dispatch =  useDispatch();
const inputElement = useRef();
   
const handeleIncrement = ()=>{
dispatch({type: "INCREMENT"});
}

const handleDecrement = ()=>{
dispatch({type: "DECREMENT"});
}

const handleAdd = ()=>{
dispatch({type: "ADD",payload:{
   num:inputElement.current.value
}});
   inputElement.current.value=""
}



const handleSubtract = ()=>{
dispatch({type: "SUBTRACT",payload:{
   num:inputElement.current.value
}});
   inputElement.current.value=""
}


const handelPrivacyToggel = ()=>{
dispatch({type: "PRIVACY_TOGGEL"});
}

    return (
        <>  
  <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">    
  <button type="button" className="btn btn-primary" onClick={handeleIncrement}>+1</button>
  <button type="button" className="btn btn-success"onClick={handleDecrement}>-1</button>
  <button type="button" className="btn btn-warning" onClick={handelPrivacyToggel}>Privacy Toggel</button>
  </div> 

  <div className="d-grid gap-2 d-sm-flex justify-content-sm-center control-row">    
  <input ref={inputElement} type="text" placeholder="Enter Number" className="number-input"/>
  <button type="button" className="btn btn-info"  onClick={handleAdd}>Add</button>
  <button type="button" className="btn btn-danger" onClick={handleSubtract}>Subtract</button>
  </div> 
  </>
    )
}

export default Controls