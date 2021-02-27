import React from "react";
import "./SongCard.css";
import play from "../../images/play.png";

function SongCard(props) {
  const { songs, album, playTrack } = props;
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
  const playSong = (e) => {
    var trackNumber = songs.songId;
    playTrack(trackNumber);
  };

  return (
    <div className="sc-main-cont">
      <div onClick={playSong}>
        <img className="sc-play" src={play} alt="play"></img>
        <img src={albumCover} className="sc-cover"></img>
      </div>
      <div className="sc-title-year-cont" onClick={handleClick}>
        <span className="sc-title">{songTitle}</span>
        <span className="sc-year">{albumYear}</span>
      </div>
      <span className="sc-dur" onClick={handleClick}>
        {songs.dur}
      </span>
    </div>
  );
}

export default SongCard;
