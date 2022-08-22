import React from "react";
import cartEmpty from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

function CartEmpty() {
  return (
    <div className="cart cart--empty">
      <h2>
        Cart is empty <span>😕</span>
      </h2>
      <p>
        It looks like you haven't ordered anything yet. <br />
        Go back to the home page in order to place some items in your cart.
      </p>
      <img src={cartEmpty} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
}

export default CartEmpty;
