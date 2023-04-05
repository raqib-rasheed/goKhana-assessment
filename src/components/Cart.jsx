import React from "react";

export default function Cart({ itemsInCart }) {
  function getTotalAmount() {
    let total = 0;
    itemsInCart?.forEach((item) => {
      total += item?.price * item?.count;
    });
    return total;
  }
  return (
    <div className="cartContainer">
      <div className="cartHeader">
        <h3>Cart</h3>
        <h5>Total: {getTotalAmount()}</h5>
      </div>
      <div>
        {itemsInCart.length > 0 ? (
          itemsInCart?.map((item) => {
            return (
              <h5 className="cartAddedItem" key={item?.id}>
                {item?.name}: {item?.price * item?.count}
              </h5>
            );
          })
        ) : (
          <span style={{ color: "gray" }}> Add items to cart</span>
        )}
      </div>
    </div>
  );
}
