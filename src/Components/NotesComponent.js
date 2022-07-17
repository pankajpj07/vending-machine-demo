import Cart from "./Cart";
import "./style.css";
import { useState } from "react";
import SuccessFailureModal from "./SuccessFailureModal";

const acceptedNotesBoxStyle = {
  display: "flex",
};
const noteButtonStyle = {
  width: "60px",
  height: "60px",
  background: "green",
  color: "white",
  border: "solid 2px black",
  marginRight: "10px",
};
export default function NotesComponent({
  acceptedNotes,
  updateBalance,
  loadedBalance,
  cart,
  cartTotal,
  setCart,
  setCartTotal,
}) {
  const [show, setShow] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOrder = () => {
    cart.map((cartItem, index) => {
      console.log({
        ...cart,
        itemInStock: cartItem.itemInStock - 1,
      });
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...cartItem,
          itemInStock: cartItem.itemInStock - 1,
        }),
      };

      fetch(
        `https://my-vending-machine-heroku-22.herokuapp.com/vendingmachine/${cartItem.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (index === cart.length - 1) {
            setCart([]);
            setCartTotal(0);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    });
    handleShow();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="acceptedNotesBox" style={acceptedNotesBoxStyle}>
        {acceptedNotes.map((note, index) => {
          return (
            <button
              key={index}
              onClick={() => updateBalance(note)}
              style={noteButtonStyle}
            >{`₹${note}`}</button>
          );
        })}
      </div>
      <div
        className="loadedBalanceBox"
        style={{
          width: "270px",
          background: "lightgray",
          padding: "20px",
          textAlign: "center",
          margin: "10px 0 0 -10px",
          fontWeight: "bold",
          border: "solid 1px black",
        }}
      >
        {`Loaded Balance: ₹${loadedBalance}`}
      </div>
      <div>
        <button
          style={{
            width: "270px",
            background: "red",
            padding: "10px",
            color: "white",
            textAlign: "center",
            margin: "10px 0 0 -10px",
          }}
          onClick={() => updateBalance(0)}
        >
          Withdraw All
        </button>
      </div>
      {cartTotal ? <Cart cart={cart} cartTotal={cartTotal} /> : null}
      {cartTotal ? (
        <div>
          <button
            style={{
              width: "270px",
              background: "green",
              padding: "10px",
              color: "white",
              textAlign: "center",
              margin: "10px 0 0 -10px",
            }}
            className="buy-button"
            onClick={handleOrder}
          >
            Buy Now
          </button>
        </div>
      ) : null}
      <SuccessFailureModal
        show={show}
        handleClose={handleClose}
        orderSuccess={orderSuccess}
      />
    </div>
  );
}
