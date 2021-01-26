import "./App.css";
import { useEffect } from "react";
import { Routes } from "./Routes/Routes";
import { useHistory } from "react-router-dom";

const App = () => {
  const history = useHistory();
  let path = history.location.pathname;
  console.log(history.location.pathname);
  useEffect(() => {
    console.log("routes");
    window.scrollTo(0, 0);
  }, [path]);
  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default App;
