import ClockHeading from "./Component/ClockHeading";
import ClockSlogan from "./Component/ClockSlogan";
import CurrentTime from "./Component/CurrentTime";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <center>
      <ClockHeading></ClockHeading>
      <ClockSlogan></ClockSlogan>
      <CurrentTime></CurrentTime>
    </center>
  );
}

export default App;