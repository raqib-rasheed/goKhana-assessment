import React, { useState } from "react";
import "./App.css";
import Cart from "./components/Cart";

export default function App() {
  const fruits = [
    { name: "Apple", price: 120, quantity: 1, id: 1 },
    { name: "Mango", price: 100, quantity: 2, id: 2 },
    { name: "Watermelon", price: 80, quantity: 3, id: 3 },
  ];
  const [itemsInCart, setItemsInCart] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);

  function handleAddItemToCart(addItemId) {
    const match = fruits?.find((item) => item.id === addItemId);
    const itemInCartIndex = itemsInCart?.findIndex(
      (item) => item.id === addItemId
    );
    if (itemInCartIndex >= 0) {
      const countUpdatedCart = itemsInCart;
      if (countUpdatedCart[itemInCartIndex]?.hasOwnProperty("count")) {
        countUpdatedCart[itemInCartIndex]["count"] =
          countUpdatedCart[itemInCartIndex]["count"] + 1;
      }
      setItemsInCart(countUpdatedCart);
    } else {
      const updatedItems = [...itemsInCart, { ...match, count: 1 }];
      setItemsInCart(updatedItems);
    }
    checkForItemButtonDisable(addItemId);
  }

  function checkForItemButtonDisable(checkButtonStatusId) {
    const match = itemsInCart?.find((item) => item.id === checkButtonStatusId);
    if (match && match?.count >= match?.quantity) {
      setDisabledButtons((prevState) => [...prevState, checkButtonStatusId]);
    } else {
      const match = fruits?.find((item) => item.id === checkButtonStatusId);
      if (match?.quantity === 1) {
        setDisabledButtons((prevState) => [...prevState, checkButtonStatusId]);
      }
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h3>FRESHO</h3>
      </header>
      <div className="fruits-container">
        {fruits?.map((item) => {
          return (
            <div className="fruitItem" key={item?.id}>
              <span>
                {item?.name}: {item?.price}
              </span>
              <button
                disabled={disabledButtons?.includes(item?.id)}
                onClick={() => handleAddItemToCart(item?.id)}
              >
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
      <Cart itemsInCart={itemsInCart} />
    </div>
  );
}

// existing fruits need to show
// there should be an option to add fruits to cart
// cart displays itemns in cart and also shows total amount
// conditional disabling of add toi cart button if max quatity reached.
