import React from "react";
import "./SongCard.css";

function SongCard(props) {
  const { songs, album } = props;
  // console.log(album);

  let albumCover = album
    .filter((f) => f.id === songs.albumId)
    .map((m) => {
      return m.cover;
    });

  let albumYear = album
    .filter((f) => f.id === songs.albumId)
    .map((m) => {
      return m.year;
    });

  var title = songs.title;
  let songTitle = title.length > 30 ? title.substring(0, 27) + "..." : title;

  const handleClick = () => {
    window.location.href = `/album-details/${songs.albumId}/${songs.songId}`;
  };

  return (
    <div className="sc-main-cont" onClick={handleClick}>
      <img src={albumCover} className="sc-cover"></img>
      <div className="sc-title-year-cont">
        <span className="sc-title">{songTitle}</span>
        <span className="sc-year">{albumYear}</span>
      </div>
      <span className="sc-dur">{songs.dur}</span>
    </div>
  );
}

export default SongCard;
