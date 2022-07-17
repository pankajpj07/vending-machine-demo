import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import ItemCard from "./Components/ItemCard";
import NotesComponent from "./Components/NotesComponent";

import "bootstrap/dist/css/bootstrap.min.css";

// import "./App.css";

const itemBoxStyle = {
  display: "flex",
  flexWrap: "wrap",
  width: "75%",
};

function App() {
  const [itemData, setItemData] = useState([]);
  const [loadedBalance, setLoadedBalance] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const acceptedNotes = [10, 20, 50, 100];

  useEffect(() => {
    fetch("https://my-vending-machine-heroku-22.herokuapp.com/vendingmachine/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItemData(data);
      });
  }, []);
  const updateBalance = (note) => {
    setLoadedBalance((prevBalance) => (note === 0 ? note : prevBalance + note));
  };
  const addToCart = (item) => {
    updateBalance(-item.itemPrice);
    setCartTotal((prevTotal) => prevTotal + item.itemPrice);
    setCart((prevCart) => [...prevCart, item]);
  };
  const removeFromCart = (item) => {
    updateBalance(item.itemPrice);
    setCartTotal((prevTotal) => prevTotal - item.itemPrice);
    const updatedCart = cart.filter((cartItem) => cartItem !== item);
    setCart(updatedCart);
  };
  return (
    <Container style={{ marginTop: "20px" }}>
      <div className="vendingMachine" style={{ display: "flex" }}>
        <div className="itemBox" style={itemBoxStyle}>
          {itemData.map((item) => {
            return (
              <ItemCard
                key={item.id}
                item={item}
                loadedBalance={loadedBalance}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
              />
            );
          })}
        </div>
        <NotesComponent
          acceptedNotes={acceptedNotes}
          updateBalance={updateBalance}
          loadedBalance={loadedBalance}
          cart={cart}
          cartTotal={cartTotal}
          setCartTotal={setCartTotal}
          setCart={setCart}
        />
      </div>
    </Container>
  );
}

export default App;
