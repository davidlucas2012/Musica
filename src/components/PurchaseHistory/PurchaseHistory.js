import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useState } from "react";
import "./PurchaseHistory.css";

function PurchaseHistory(props) {
  const { album, purchase } = props;
  const [purchases, setpurchases] = useState([]);
  const [purchaseDate, setpurchaseDate] = useState([]);

  useEffect(() => {
    console.log(album);
    console.log(purchase);
    purchase?.map((m) => {
      album
        ?.filter((f) => f.id === m.albumId)
        .map((a) => {
          setpurchases((prev) => [...prev, a]);
          setpurchaseDate((prev) => [...prev, m.timeStamp]);
        });
    });
  }, []);

  const handleItemClick = (e) => {
    window.location.href = `album-details/${e.target.id}/0`;
    console.log(e.target.id);
  };

  return (
    <div className="ph-main-cont">
      <span className="ph-title">Purchase History</span>

      <div className="item-div">
        {purchases.reverse().map((a, key) => (
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
              <span className="item-price">${(a.ratings * 5).toFixed(2)}</span>

              {purchase
                .filter((f) => f.albumId === a.id)
                .map((m) => (
                  <span className="item-purchase-date">{m.timeStamp}</span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchaseHistory;
