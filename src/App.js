import "./styles.css";
import { useState } from "react";

export default function App() {
  const [fruits, setFruits] = useState([
    { name: "apple", price: 120, quantity: 1, id: 1 },
    { name: "mango", price: 100, quantity: 2, id: 2 },
    { name: "watermelon", price: 80, quantity: 3, id: 3 },
  ]);
  const [itemsInCart, setItemsInCart] = useState([]);

  function handleAddItemToCart(addItemId) {
    const match = fruits?.find((item) => item.id === addItemId);
    const itemInCartIndex = itemsInCart?.findIndex(
      (item) => item.id === addItemId
    );
    console.log({ itemInCartIndex });
    if (itemInCartIndex >= 0) {
      setItemsInCart((prevState) => {
        if (prevState[itemInCartIndex]?.hasOwnProperty("count")) {
          const countUpdatedCart = prevState;
          countUpdatedCart[itemInCartIndex]["count"]++;
          return countUpdatedCart;
        }
      });
    } else {
      setItemsInCart((prevState) => {
        return [...prevState, { ...match, count: 1 }];
      });
    }
  }
  function checkForItemButtonDisable(checkButtonStatusId) {
    const match = itemsInCart?.find((item) => item.id === checkButtonStatusId);
    if (match) {
      return match?.quantity >= match?.count;
    } else {
      return false;
    }
  }
  return (
    <div className="App">
      <div className="fruits-container">
        <ul>
          {fruits?.map((item) => {
            return (
              <>
                <li>
                  {item?.name}: {item?.price}
                </li>
                <button
                  className={checkForItemButtonDisable ? "disabled" : ""}
                  disabled={checkForItemButtonDisable}
                  onClick={() => handleAddItemToCart(item?.id)}
                >
                  Add to cart
                </button>
              </>
            );
          })}
        </ul>
      </div>
      <div className="cartContainer">
        <h3>Cart</h3>
        <ul>
          {itemsInCart?.map((item) => {
            return (
              <>
                <li>
                  {item?.name}: {item?.price}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// existing fruits need to show
// there should be an option to add fruits to cart
// cart displays itemns in cart and also shows total amount
// conditional disabling of add toi cart button if max quatity reached.
