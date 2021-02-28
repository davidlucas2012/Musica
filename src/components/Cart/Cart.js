import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import "./Cart.css";
import StripeCheckout from "react-stripe-checkout";

function Cart(props) {
  const { cart, album, deleteItem, purchase } = props;

  const [sAlbum, setsAlbum] = useState([]);

  useEffect(() => {
    if (album && cart) {
      cart?.map((c) =>
        album
          .filter((f) => c.albumId === f.id)
          .map((al) => setsAlbum((prev) => [...prev, al]))
      );
    }
  }, [cart]);

  const totalPrice = () => {
    return sAlbum?.reduce(
      (total, currentValue) => (total = total + currentValue.ratings),
      0
    );
  };

  const handleDelete = (e) => {
    deleteItem(e.target.id);
  };

  const handleItemClick = (e) => {
    window.location.href = `album-details/${e.target.id}/0`;
    console.log(e.target.id);
  };

  const purchaseHistory = () => {
    window.location.href = "/purchase-history";
    // console.log(sAlbum);
    // sAlbum.map((a) => purchase(a.id));
  };

  const handleToken = (token) => {
    sAlbum.map((a) => purchase(a.id));
  };

  return (
    <div className="cart-main-cont">
      <div className="cart-left-cont">
        <span className="cart-title">SHOPPING CART</span>

        <span className="cart-count-span">
          You have {cart?.length} items in your cart
        </span>
        <span className="cart-div"></span>

        <div className="cart-item-cont">
          {sAlbum.reverse().map((a, key) => (
            <div key={key} className="item-cont">
              <div className="item-left" id={a.id} onClick={handleItemClick}>
                <img className="item-cover" src={a.cover}></img>
                <Rating
                  className="item-ratings"
                  name="half-rating-read"
                  defaultValue={a.ratings}
                  precision={0.5}
                  readOnly
                />
              </div>
              <div className="item-mid" id={a.id} onClick={handleItemClick}>
                <span className="ad-name">{a.name}</span>
                <span className="ad-artist">{a.artist}</span>
                <span className="ad-year">{a.year}</span>
              </div>
              <div className="item-right">
                <span className="item-price">
                  ${(a.ratings * 5).toFixed(2)}
                </span>
                <span className="item-delete" id={a.id} onClick={handleDelete}>
                  remove
                </span>
              </div>
            </div>
          ))}
        </div>
        <span className="cart-history" onClick={purchaseHistory}>
          PURCHASE HISTORY
        </span>
      </div>

      <div className="cart-right-cont">
        <span className="cart-summary-span">Order Summary</span>
        <span className="cart-summary-div"></span>

        <div className="cart-promo-div">
          <span className="cart-promo-span">Do you have a promo code?</span>
          <div className="promo-input-cont">
            <input className="promo-input"></input>
            <button className="promo-btn">APPLY</button>
          </div>
        </div>

        <span className="cart-divider"></span>

        <div className="cart-sub-cont">
          <span className="cart-subtotal">SUBTOTAL</span>
          <span className="cart-subtotal-price">
            ${(totalPrice() * 5).toFixed(2)}
          </span>
        </div>

        <div className="cart-breakdown-cont">
          <span className="cart-field">Tax (12%)</span>
          <span className="cart-value">
            ${(totalPrice() * 5 * 0.12).toFixed(2)}
          </span>
        </div>
        <div className="cart-breakdown-cont">
          <span className="cart-field">Estimated Shipping</span>
          <span className="cart-value">FREE</span>
        </div>

        <span className="cart-divider"></span>

        <div className="cart-sub-cont">
          <span className="cart-subtotal">ESTIMATED TOTAL</span>
          <span className="cart-subtotal-price">
            ${(totalPrice() * 5 * 1.12).toFixed(2)}
          </span>
        </div>

        <span className="cart-divider"></span>
        <div
          className={sAlbum.length > 0 ? "stripe-div" : "stripe-div-disabled"}
        >
          <StripeCheckout
            amount={(100 * totalPrice() * 5 * 1.12).toFixed(2)}
            name={"Album Purchase"} // the pop-in header title
            // image={movieInfo.cover} // the pop-in header image (default none)
            ComponentClass={
              sAlbum.length > 0 ? "stripe-div" : "stripe-div-disabled"
            }
            description={`Payment for ${sAlbum.length} album(s).`}
            stripeKey="pk_test_51HEc6kBC7HNV0emX8YOONqQbo6S2RhuNQLfW5uvgiRZOg3EKhKoY6heYwUWdxbrwPdsil6StqCOEWlvQUxKfbiHV005w2ldUKF"
            token={handleToken}
          >
            <div
              className={
                sAlbum.length > 0
                  ? "cart-checkout-btn"
                  : "cart-checkout-btn-disabled"
              }
            >
              CHECK OUT
            </div>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
}

export default Cart;
