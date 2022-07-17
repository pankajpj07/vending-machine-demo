import React from "react";

export default function Cart({ cart, cartTotal = 0 }) {
  return (
    <div style={{ marginTop: "50px" }}>
      {cart.map((cartItem) => {
        return (
          <div className="cartItem" style={{ display: "flex" }}>
            <img
              src={cartItem.image}
              style={{ width: "40px", height: "40px" }}
              alt={`${cartItem.image}`}
            />
            <p style={{ minWidth: "180px" }}>{cartItem.itemName}</p>
            <p>₹{cartItem.itemPrice}</p>
          </div>
        );
      })}
      <hr />
      <div
        className="cartTotal"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <p>Cart Total:</p>
        <p>₹{cartTotal}</p>
      </div>
      <hr />
    </div>
  );
}
