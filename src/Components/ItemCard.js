import { Card, Button } from "react-bootstrap";

function ItemCard({
  item,
  loadedBalance = 0,
  addToCart,
  removeFromCart,
  cart,
}) {
  return (
    <Card
      style={{
        width: "11rem",
        margin: "0 0 10px 10px",
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      <Card.Img
        style={{ padding: "20px", width: "12rem", height: "12rem" }}
        variant="top"
        src={item.image}
      />
      <Card.Body
        style={{
          opacity: `${
            loadedBalance >= item.itemPrice || cart.includes(item) ? "1" : "0.5"
          }`,
        }}
      >
        <Card.Title>{item.itemName}</Card.Title>
        <Card.Text>{`₹${item.itemPrice}`}</Card.Text>
        {!cart.includes(item) ? (
          <Button
            style={{ width: "100px" }}
            variant={item.itemInStock > 0 ? "primary" : "secondary"}
            disabled={
              loadedBalance < item.itemPrice || item.itemInStock <= 0
                ? true
                : false
            }
            onClick={() => addToCart(item)}
          >
            {item.itemInStock > 0 ? "Add" : "NA"}
          </Button>
        ) : (
          <Button
            style={{ width: "100px" }}
            variant="danger"
            onClick={() => removeFromCart(item)}
          >
            Remove
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
