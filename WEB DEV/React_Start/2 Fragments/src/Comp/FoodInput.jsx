import styles from "./FoodInput.module.css"

const FoodInput = ({handelKeyDown})=>{
    return(
        <input 
        onKeyDown={handelKeyDown}
        className={styles.inp} type="text" placeholder="Enter food here"  />
    )
}

export default FoodInput;