import React from "react";
import AlbumCard from "../AlbumCard/AlbumCard";
import "./TopAlbum.css";

function TopAlbum(props) {
  const { album } = props;

  return (
    <div className="ta-main-cont">
      <span className="ta-title">Top Albums</span>
      <div className="ta-cont">
        {album ? album.map((a) => <AlbumCard album={a} />) : null}
      </div>
    </div>
  );
}

export default TopAlbum;
