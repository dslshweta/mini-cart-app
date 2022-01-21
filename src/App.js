import React from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./components/Header";
import Products from "./components/Products";
import { useLocalStorage } from "./hooks/useLocalStorage";

const useStyles = makeStyles(() => ({
  appContainer: {
    display: "block",
    padding: "30px"
  }
}));
  
function App() {
  const [cart, setCart] = useLocalStorage("cart", []);
  const classes = useStyles();

  return (
    <div className={ classes.appContainer }>
      <Header cart={cart} cartChanger={setCart} />
      <Products cart={cart} cartChanger={setCart} />	
    </div>
  );
}

export default App