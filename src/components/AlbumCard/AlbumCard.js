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
      <span className="ac-price">${(album.ratings * 5).toFixed(2)}</span>
      <span className="ac-name">{album.name}</span>
    </div>
  );
}

export default AlbumCard;
