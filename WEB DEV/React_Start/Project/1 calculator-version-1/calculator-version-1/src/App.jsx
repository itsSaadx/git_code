import style from "./App.module.css"
import Display from "./Comp/Display"
import ButtonsContainer from "./Comp/ButtonsContainer"

function App() {
  

  return (
    <>
     <div className={style.calculator}>
      <Display/>
      <ButtonsContainer/>
     </div>
    </>
  )
}

export default App
