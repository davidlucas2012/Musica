import React, { useEffect, useState } from "react";
import AlbumCard from "../AlbumCard/AlbumCard";
import "./TopAlbum.css";
import brush from "../../images/brush.png";

function TopAlbum(props) {
  const { album, purchase } = props;
  const [purchases, setpurchases] = useState([]);

  useEffect(() => {
    purchase
      ?.sort(
        ({ date: previousRate }, { date: currentRate }) =>
          previousRate - currentRate
      )
      .map((m) => {
        album
          ?.filter((f) => f.id === m.albumId)
          .map((a) => {
            console.log(a);
            setpurchases((prev) => [...prev, a]);
          });
      });
  }, []);

  return (
    <div className="ta-main-cont">
      <div className="ta-title-cont">
        <img className={purchase ? "ta-brush-p" : "ta-brush"} src={brush}></img>
        <span className="ta-title">
          {purchase ? "Recent Purchases" : "Top Albums"}
        </span>
      </div>

      <div className="ta-cont">
        {album
          ? purchase
            ? purchases
                .reverse()
                .sort(
                  ({ id: previousRate }, { albumId: currentRate }) =>
                    previousRate - currentRate
                )
                .slice(0, 5)
                .map((a) => <AlbumCard album={a} />)
            : album
                .slice(0, 10)
                .sort(
                  ({ ratings: previousRate }, { ratings: currentRate }) =>
                    currentRate - previousRate
                )
                .map((a) => <AlbumCard album={a} />)
          : null}
      </div>
    </div>
  );
}

export default TopAlbum;
