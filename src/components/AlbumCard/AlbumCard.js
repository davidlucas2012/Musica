import React from "react";
import "./AlbumCard.css";

function AlbumCard(props) {
  const { album } = props;

  const handleClick = () => {
    window.location.href = `/album-details/${album.id}/0`;
  };

  return (
    <div className="ac-main-cont" onClick={handleClick}>
      <img className="ac-cover" src={album.cover}></img>
    </div>
  );
}

export default AlbumCard;
