import React from "react";
import AlbumCard from "../AlbumCard/AlbumCard";
import "./TopAlbum.css";
import brush from "../../images/brush.png";

function TopAlbum(props) {
  const { album } = props;

  return (
    <div className="ta-main-cont">
      <div className="ta-title-cont">
        <img className="ta-brush" src={brush}></img>
        <span className="ta-title">Top Albums</span>
      </div>

      <div className="ta-cont">
        {album
          ? album
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
